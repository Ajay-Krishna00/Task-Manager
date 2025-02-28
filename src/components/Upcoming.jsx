import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  Stack,
  Tooltip,
  IconButton,
  useColorMode,
  Divider,
  Spinner,
  Flex,
  Alert,
  AlertIcon,
  CloseButton,
  useDisclosure,
  useToast,
  Button,
} from "@chakra-ui/react";

import { StyledText } from "./StyledComponenets";
import { CiEdit } from "react-icons/ci";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRemoveDone } from "react-icons/md";
import { useState, useEffect } from "react";
import EditTaskModal from "./EditTaskModal";
import { fetchTasks } from "../utils/api";
import { createTask } from "../utils/api";
import { updateTask } from "../utils/api";
import { deleteTask } from "../utils/api";
import TaskModal from "./AddTaskModal";
import { IoAddOutline } from "react-icons/io5";

export default function Upcoming() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState(null);
  const toast = useToast();
  const {
    isOpen: AddIsOpen,
    onOpen: AddOnOpen,
    onClose: AddOnClose,
  } = useDisclosure();

  const { colorMode } = useColorMode();
  const {
    isOpen: EditIsOpen,
    onOpen: EditOnOpen,
    onClose: EditOnClose,
  } = useDisclosure();

  const fetchData = async () => {
    // ✅
    try {
      const { data } = await fetchTasks();
      if (data) {
        const overdue = data.tasks.filter((task) => {
          const today = new Date();
          const dueDate = new Date(task.dueDate);
          today.setHours(0, 0, 0, 0);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate >= today && task.isCompleted === false;
        });
        setTasks(overdue);
      } else {
        throw new Error("Data or tasks are undefined in the response");
      }
    } catch (e) {
      if (e == "TypeError: data is undefined") {
        setError("");
      } else {
        setError(`Failed to fetch data`);
      }
    } finally {
      setLoading(false);
    }
  };
  const addTask = async (newTask) => {
    // ✅
    const taskWithId = { ...newTask, id: Date.now() };
    try {
      const data = await createTask(taskWithId);
      if (data.message === "Task created successfully") {
        toast({
          title: "Task Added Successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTasks((prevTasks) => [...prevTasks, taskWithId]); // Update local state
        fetchData(); //  fetch data to ensure sync
      } else {
        toast({
          title: "An error occurred.",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  const editTask = async (editedTask) => {
    // ✅
    try {
      const data = await updateTask(editedTask);
      if (data.data.message == "Task updated successfully") {
        toast({
          title: "Task Edited Successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editedTask.id ? editedTask : task,
          ),
        );
        fetchData(); //  fetch data to ensure sync
      } else {
        toast({
          title: "An error occurred.",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    EditOnOpen();
  };

  const handleDelete = async (DTask) => {
    // ✅
    setTasks(tasks.filter((t) => t.id !== DTask.id));
    try {
      const res = await deleteTask(DTask.id);
      if (res.message == "Task deleted successfully") {
        toast({
          title: "Task Deleted Successfully!",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "An error occurred.",
          description: res.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== DTask.id));
      fetchData();
    } catch (e) {
      setError(e.message);
    }

    fetchData();
  };

  const handleComplete = async (ComTask) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    // Get the month (Note: months are 0-indexed, so add 1)
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const compDate = `${year}-${month}-${date}`;
    const updatedTask = {
      ...ComTask,
      isCompleted: !ComTask.isCompleted,
      completedDate: !ComTask.isCompleted ? compDate : null,
    };
    try {
      const data = await updateTask(updatedTask);
      if (
        data.data.message == "Task updated successfully" &&
        updatedTask.isCompleted
      ) {
        toast({
          title: "Task Completed!",
          description: "You Did It!👍",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === ComTask.id
            ? { ...task, isCompleted: updatedTask.isCompleted }
            : task,
        ),
      );

      fetchData(); //  fetch data to ensure sync
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => {
    // ✅
    async function fetchData() {
      try {
        const { data } = await fetchTasks();
        if (data) {
          const overdue = data.tasks.filter((task) => {
            const today = new Date();
            const dueDate = new Date(task.dueDate);
            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate >= today && task.isCompleted === false;
          });
          setTasks(overdue);
        } else {
          throw new Error("Data or tasks are undefined in the response");
        }
      } catch (e) {
        if (e == "TypeError: data is undefined") {
          setError("");
        } else {
          setError(`Failed to fetch data `);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const badgeColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "red";
      case "Important":
        return "orange";
      case "Soon":
        return "yellow";
      case "Later":
        return "blue";
      case "Trivial":
        return "green";
      case "Whenever":
        return "gray";
    }
  };
  return (
    <Box>
      {loading && (
        <Flex
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"60vh"}
        >
          <Spinner size="xl" color="green" borderWidth="6px" />
        </Flex>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => {
              setError("");
            }}
          />
        </Alert>
      )}
      {tasks.length === 0 && !loading && (
        <Flex
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"60vh"}
        >
          <StyledText textAlign={"center"} fontSize={"20px"} mt={"20px"}>
            No Upcoming tasks
          </StyledText>
        </Flex>
      )}
      <Grid
        templateColumns={{
          base: " 1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          xl: "repeat(4,1fr)",
        }}
        gap={4}
        mb={2}
      >
        {tasks.map((task, i) => (
          <Card
            key={i}
            backgroundColor={colorMode === "dark" ? "black" : "white"}
          >
            <Stack direction={"column"}>
              <Badge
                colorScheme={badgeColor(task.priority)}
                width={"100%"}
                p={"2px"}
                pl={"10px"}
              >
                {task.priority}
              </Badge>
              <CardHeader p={"15px"} pt={"5px"} pb={"5px"} fontSize={"20px"}>
                <StyledText fSize={"20px"} fontWeight="600">
                  {task.title}
                </StyledText>
              </CardHeader>
              <CardBody p={"15px"} pt={"0px"} pb={"5px"}>
                <StyledText noOfLines={[3, 2]} h={"40px"}>
                  {task.description}
                </StyledText>
              </CardBody>
              <Divider display={"flex"} w="95%" alignSelf="center" />
              <CardFooter
                p={"15px"}
                pt={"0px"}
                pb={"5px"}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-evenly"}
              >
                <Tooltip label="Edit">
                  <IconButton
                    icon={<CiEdit />}
                    fontSize={"21px"}
                    background={colorMode === "light" ? "white" : ""}
                    _hover={{
                      background:
                        colorMode === "light" ? "gray.50" : "gray.700",
                    }}
                    onClick={() => handleEdit(task)}
                  />
                </Tooltip>
                <Tooltip
                  label={task.isCompleted ? "Undo Completion" : "Mark as Done"}
                >
                  <IconButton
                    icon={
                      task.isCompleted ? (
                        <MdOutlineRemoveDone />
                      ) : (
                        <IoCheckmarkDone />
                      )
                    }
                    fontSize={"21px"}
                    background={colorMode === "light" ? "white" : ""}
                    _hover={{
                      background:
                        colorMode === "light" ? "gray.50" : "gray.700",
                    }}
                    onClick={() => handleComplete(task)}
                  />
                </Tooltip>
                <Tooltip label="Delete">
                  <IconButton
                    icon={<MdDeleteOutline />}
                    fontSize={"21px"}
                    background={colorMode === "light" ? "white" : ""}
                    _hover={{
                      background:
                        colorMode === "light" ? "gray.50" : "gray.700",
                    }}
                    onClick={() => handleDelete(task)}
                  />
                </Tooltip>
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </Grid>
      <Tooltip label="Add Task" aria-label="A tooltip" placement="bottom">
        <Button
          borderRadius={"50%"}
          h={{ md: "60px", base: "50px" }}
          w={{ md: "60px", base: "50px" }}
          position={"fixed"}
          bottom={"60px"}
          right={"60px"}
          color={"white"}
          bg={"blackAlpha.900"}
          p={0}
          _hover={{ bg: "blue.500" }}
          onClick={AddOnOpen}
        >
          <IoAddOutline fontSize={"45px"} />
        </Button>
      </Tooltip>
      <TaskModal isOpen={AddIsOpen} onClose={AddOnClose} addTask={addTask} />
      <EditTaskModal
        isOpen={EditIsOpen}
        onClose={EditOnClose}
        editTask={editTask}
        currentTask={currentTask}
      />
    </Box>
  );
}
