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
    async function fetchData() {
      try {
        const { data } = await fetchTasks();
        if (data && data.tasks) {
          setTasks(data.tasks);
          console.log(data.tasks);
        } else {
          throw new Error("Data or tasks are undefined in the response");
        }
      } catch (e) {
        if (e == "TypeError: datas is undefined") {
          setError("");
        } else {
          setError(`Failed to fetch data ${e}`);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const addTask = async (newTask) => {
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
        fetchData(); // Optionally, fetch data to ensure sync
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
      alert("Error: " + error.message);
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

  const fetchData = async () => {
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
              <Th>Title</Th>
              <Th>Due Date</Th>
              <Th>Priority</Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>

          <Tbody>
            {tasks.map((task, i) => (
              <Tr key={i}>
                <Td maxW={"300px"} flexWrap={"wrap"} wordBreak={"break-word"}>
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
                      <TagLabel>Completed</TagLabel>
                    </Tag>
                  )}
                </Td>
                <Td>{task.dueDate}</Td>
                <Td>
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
                  >
                    {task.priority}
                  </Badge>
                </Td>
                <Td>
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
                </Td>
                <Td>
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
                      fontSize={"21px"}
                      background={colorMode === "light" ? "white" : ""}
                      _hover={{
                        background:
                          colorMode === "light" ? "gray.50" : "gray.700",
                      }}
                      onClick={() => handleComplete(task)}
                    />
                  </Tooltip>
                </Td>
                <Td>
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
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

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
