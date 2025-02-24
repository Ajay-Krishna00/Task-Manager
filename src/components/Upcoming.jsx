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
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { StyledText } from "./StyledComponenets";
import { CiEdit } from "react-icons/ci";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRemoveDone } from "react-icons/md";
import { useState, useEffect } from "react";
import EditTaskModal from "./EditTaskModal";
import { fetchTasks } from "../utils/api";

export default function Upcoming() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState(null);

  const { colorMode } = useColorMode();
  const {
    isOpen: EditIsOpen,
    onOpen: EditOnOpen,
    onClose: EditOnClose,
  } = useDisclosure();

  const fetchData = async () => {
    {
      try {
        const res = await fetch("http://localhost:5000/tasks");
        if (!res.ok) {
          throw new Error("Failed to fetch data from the server");
        }
        const data = await res.json();
        const overdue = data.filter((task) => {
          const today = new Date();
          const dueDate = new Date(task.dueDate);
          today.setHours(0, 0, 0, 0);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate >= today && task.isCompleted === false;
        });
        setTasks(overdue);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
  };
  const addTask = async (newTask) => {
    const taskWithId = { ...newTask, id: Date.now() };
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskWithId),
      });
      if (!res.ok) throw new Error("Error adding task");
      setTasks((prevTasks) => [...prevTasks, taskWithId]); // Update local state
      fetchData(); // Optionally, fetch data to ensure sync
    } catch (e) {
      console.error("Error adding task:", e);
      setError(e.message);
    }
  };

  const editTask = async (editedTask) => {
    try {
      await fetch(`http://localhost:5000/tasks/${editedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editedTask.id ? editedTask : task,
        ),
      );
    } catch (e) {
      setError(e.message);
    }

    fetchData();
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    EditOnOpen();

    fetchData();
  };

  const handleDelete = async (DTask) => {
    setTasks(tasks.filter((t) => t.id !== DTask.id));
    try {
      await fetch(`http://localhost:5000/tasks/${DTask.id}`, {
        method: "DELETE",
      });
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== DTask.id));
    } catch (e) {
      setError(e.message);
    }

    fetchData();
  };

  const handleComplete = async (ComTask) => {
    const updatedTask = { ...ComTask, isCompleted: !ComTask.isCompleted };
    try {
      const res = await fetch(`http://localhost:5000/tasks/${ComTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) throw new Error("Error completing task");
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === ComTask.id
            ? { ...task, isCompleted: updatedTask.isCompleted }
            : task,
        ),
      );
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const { res } = await fetchTasks();
        const data = res.tasks;
        const overdue = data.filter((task) => {
          const today = new Date();
          const dueDate = new Date(task.dueDate);
          today.setHours(0, 0, 0, 0);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate >= today && task.isCompleted === false;
        });
        setTasks(overdue);
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
      <EditTaskModal
        isOpen={EditIsOpen}
        onClose={EditOnClose}
        editTask={editTask}
        currentTask={currentTask}
      />
    </Box>
  );
}
