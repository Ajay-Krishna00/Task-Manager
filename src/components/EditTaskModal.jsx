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
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

export default function EditTaskModal({
  isOpen,
  onClose,
  editTask,
  currentTask,
}) {
  const [task, setTask] = useState({
    id: currentTask?.id || null,
    title: currentTask ? currentTask.title : "",
    description: currentTask ? currentTask.description : "",
    dueDate: currentTask ? currentTask.dueDate : "",
    priority: currentTask ? currentTask.priority : "",
    isCompleted: currentTask?.isCompleted || false,
  });
  useEffect(() => {
    if (currentTask) {
      setTask({
        id: currentTask.id,
        title: currentTask.title,
        description: currentTask.description,
        dueDate: currentTask.dueDate,
        priority: currentTask.priority,
        isCompleted: currentTask.isCompleted,
      });
    }
  }, [currentTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    editTask(task);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalHeader>
          Edit Task
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
                  <option>None</option>
                </Select>
              </FormControl>

              <Button
                type="submit"
                bg={"black"}
                color={"white"}
                _hover={{ bg: "blue.300" }}
              >
                Edit Task
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
EditTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  currentTask: PropTypes.object,
};
