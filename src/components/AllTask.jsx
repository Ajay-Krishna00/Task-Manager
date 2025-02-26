import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  useColorMode,
  IconButton,
  Tooltip,
  useDisclosure,
  Badge,
  Tag,
  TagLabel,
  Alert,
  AlertIcon,
  CloseButton,
  Spinner,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRemoveDone } from "react-icons/md";
import TaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchTasks } from "../utils/api";
import { createTask } from "../utils/api";
import { updateTask } from "../utils/api";
import { deleteTask } from "../utils/api";
import { IoAddOutline } from "react-icons/io5";
import { StyledText } from "./StyledComponenets";

export default function AllTasks() {
  const { colorMode } = useColorMode();
  const {
    isOpen: AddIsOpen,
    onOpen: AddOnOpen,
    onClose: AddOnClose,
  } = useDisclosure();
  const {
    isOpen: EditIsOpen,
    onOpen: EditOnOpen,
    onClose: EditOnClose,
  } = useDisclosure();

  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // ✅
    async function fetchData() {
      try {
        const { data } = await fetchTasks();
        if (data) {
          setTasks(data.tasks);
        } else {
          throw new Error("Data or tasks are undefined in the response");
        }
      } catch (e) {
        if (e == "TypeError: datas is undefined") {
          setError("");
        } else {
          setError(`Failed to fetch data`);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
    // ✅
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
    // ✅
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

  const fetchData = async () => {
    // ✅
    {
      try {
        const { res } = await fetchTasks();
        const data = res.tasks;
        setTasks(data);
      } catch (e) {
        if (e == "TypeError: res is undefined") {
          setError("");
        } else {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box width={"100%"}>
      {error && (
        <Alert status="error" borderRadius="md">
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
      <Box width={"100%"}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Heading fontSize="22px" mb={4} ml={4}>
            All Tasks
          </Heading>
          <Button
            variant={"outline"}
            leftIcon={<IoAdd fontSize={"22px"} m="0" p="0" />}
            background={colorMode === "light" ? "white" : "#151b23"}
            border={"1px solid"}
            borderColor={colorMode === "dark" ? "white" : "black"}
            onClick={AddOnOpen}
            _hover={{
              backgroundColor: colorMode === "light" ? "white" : "gray.700",
            }}
          >
            Add Task
          </Button>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={{ md: "14px", base: "10px" }} p={0.5} minW={"90px"}>
                Title
              </Th>
              <Th fontSize={{ md: "14px", base: "10px" }} p={0.5}>
                Due Date
              </Th>
              <Th fontSize={{ md: "14px", base: "10px" }} p={0.5}>
                Priority
              </Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task, i) => (
              <Tr key={i}>
                <Td
                  maxW={"300px"}
                  flexWrap={"wrap"}
                  wordBreak={"break-word"}
                  fontSize={{ md: "17px", base: "14px" }}
                  p={0.5}
                >
                  {task.title}
                  {task.isCompleted && (
                    <Tag
                      borderRadius="full"
                      colorScheme="green"
                      p="1"
                      pl={2}
                      pr={3}
                      ml={2}
                      mt={1}
                    >
                      <TagLabel fontSize={{ md: "14px", base: "10px" }}>
                        Completed
                      </TagLabel>
                    </Tag>
                  )}
                </Td>
                <Td fontSize={{ md: "16px", base: "12px" }} p={0.5}>
                  {task.dueDate}
                </Td>
                <Td pl={1} pr={0.5}>
                  <Badge
                    colorScheme={
                      task.priority === "Urgent"
                        ? "red"
                        : task.priority === "Important"
                          ? "orange"
                          : task.priority === "Soon"
                            ? "yellow"
                            : task.priority === "Later"
                              ? "blue"
                              : task.priority === "Trivial"
                                ? "green"
                                : "gray"
                    }
                    fontSize={{ md: "13px", base: "10px" }}
                    p={0.5}
                  >
                    {task.priority}
                  </Badge>
                </Td>
                <Td p={0.5}>
                  <Tooltip label="Edit">
                    <IconButton
                      icon={<CiEdit />}
                      fontSize={{ md: "21px", base: "18px" }}
                      boxSize={{ md: "24px", base: "20px" }}
                      background={colorMode === "light" ? "white" : ""}
                      _hover={{
                        background:
                          colorMode === "light" ? "gray.50" : "gray.700",
                      }}
                      onClick={() => handleEdit(task)}
                    />
                  </Tooltip>
                </Td>
                <Td p={0.5}>
                  <Tooltip
                    label={
                      task.isCompleted ? "Undo Completion" : "Mark as Done"
                    }
                  >
                    <IconButton
                      icon={
                        task.isCompleted ? (
                          <MdOutlineRemoveDone />
                        ) : (
                          <IoCheckmarkDone />
                        )
                      }
                      fontSize={{ md: "21px", base: "18px" }}
                      boxSize={{ md: "24px", base: "20px" }}
                      background={colorMode === "light" ? "white" : ""}
                      _hover={{
                        background:
                          colorMode === "light" ? "gray.50" : "gray.700",
                      }}
                      onClick={() => handleComplete(task)}
                    />
                  </Tooltip>
                </Td>
                <Td p={0.5}>
                  <Tooltip label="Delete">
                    <IconButton
                      icon={<MdDeleteOutline />}
                      fontSize={{ md: "21px", base: "18px" }}
                      boxSize={{ md: "24px", base: "20px" }}
                      background={colorMode === "light" ? "white" : ""}
                      _hover={{
                        background:
                          colorMode === "light" ? "gray.50" : "gray.700",
                      }}
                      onClick={() => handleDelete(task)}
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {tasks.length === 0 && !loading && (
          <Flex
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            h={"60vh"}
          >
            <StyledText textAlign={"center"} fontSize={"20px"} mt={"20px"}>
              No tasks Created
            </StyledText>
          </Flex>
        )}
        {loading && (
          <Flex
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            h={"50vh"}
          >
            <Spinner size="xl" color="green" borderWidth="6px" />
          </Flex>
        )}
      </Box>
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
          p={0.5}
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
