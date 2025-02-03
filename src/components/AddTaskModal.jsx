import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Button,
  Textarea,
  useToast,
  FormControl,
  FormLabel,
  Select,
  Alert,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function TaskModal({ isOpen, onClose, addTask }) {
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    isCompleted: "false",
  });
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTask({
      id: "",
      title: "",
      description: "",
      dueDate: "",
      priority: "",
    });
    onClose();
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      if (res.ok) {
        toast({
          title: "Task Added Successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        addTask(data[0]); // [0] is used to get the first element of the array which is the newly added task
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
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalHeader>
          Add Task
          <ModalCloseButton />{" "}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Task</FormLabel>
                <Input
                  type="text"
                  placeholder="Task Title"
                  isRequired
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Task Description"
                  value={task.description}
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Due Date</FormLabel>
                <Input
                  type="date"
                  isRequired
                  value={task.dueDate}
                  onChange={(e) =>
                    setTask({ ...task, dueDate: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Priority</FormLabel>
                <Select
                  placeholder="Select Priority"
                  value={task.priority}
                  onChange={(e) =>
                    setTask({ ...task, priority: e.target.value })
                  }
                >
                  <option>Urgent</option>
                  <option>Soon</option>
                  <option>Later</option>
                  <option>Important</option>
                  <option>Trivial</option>
                  <option>Whenever</option>
                </Select>
              </FormControl>

              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{ bg: "blue.300" }}
              >
                Add Task
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
