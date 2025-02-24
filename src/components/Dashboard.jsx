import {
  Box,
  Grid,
  Flex,
  Text,
  Heading,
  Stack,
  Container,
  useColorMode,
  Alert,
  AlertIcon,
  CloseButton,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  List as ListIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { StyledText } from "./StyledComponenets";
import { fetchTasks } from "../utils/api";

const TaskDashboard = () => {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dueData, setDueData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [comData, setComData] = useState([]);
  const [upData, setUpData] = useState([]);
  const bg = colorMode === "light" ? "white" : "black";

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await fetchTasks();
        const datas = data.tasks;
        console.log(datas.tasks);
        setDueData(
          datas.filter((task) => {
            const today = new Date();
            const dueDate = new Date(task.dueDate);
            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate < today && task.isCompleted === false;
          }),
        );

        setComData(datas.filter((task) => task.isCompleted === true));

        setAllData(datas);

        setUpData(
          datas.filter((task) => {
            const today = new Date();
            const dueDate = new Date(task.dueDate);
            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate >= today && task.isCompleted === false;
          }),
        );
      } catch (e) {
        if (e == "TypeError: data is undefined") {
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
  const getTasksForDay = (dayOfWeek) => {
    return comData.filter((task) => {
      const taskDate = new Date(task.completedDate);
      const taskDay = taskDate.toLocaleString("en-US", { weekday: "short" }); // Get short day name (Mon, Tue, etc.)
      return taskDay === dayOfWeek;
    }).length;
  };
  const chartData = [
    { day: "Mon", completed: getTasksForDay("Mon") },
    { day: "Tue", completed: getTasksForDay("Tue") },
    { day: "Wed", completed: getTasksForDay("Wed") },
    { day: "Thu", completed: getTasksForDay("Thu") },
    { day: "Fri", completed: getTasksForDay("Fri") },
    { day: "Sat", completed: getTasksForDay("Sat") },
    { day: "Sun", completed: getTasksForDay("Sun") },
  ];
  const priorityTasks = upData.filter((pTask) => {
    return pTask.priority === "Urgent" || pTask.priority === "Important";
  });
  return (
    <Container maxW="container.xl" py={6}>
      {loading ? (
        <Flex
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"50vh"}
        >
          <Spinner size="xl" color="green" borderWidth="6px" />
        </Flex>
      ) : (
        <>
          {error && (
            <Alert status="error" mb={4}>
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
          <Heading fontSize={"22px"}>Dashboard</Heading>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
            gap={4}
            mb={6}
          >
            <Box bg={bg} p={6} borderRadius="lg" boxShadow="md">
              <Flex align="center">
                <ListIcon size={30} stroke="#3182CE" />
                <Box ml={4}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Total Tasks
                  </Text>
                  <Heading size="lg">{allData.length} </Heading>
                </Box>
              </Flex>
            </Box>

            <Box bg={bg} p={6} borderRadius="lg" boxShadow="md">
              <Flex align="center">
                <Clock size={30} stroke="#DD6B20" />
                <Box ml={4}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    UpComing
                  </Text>
                  <Heading size="lg">{upData.length}</Heading>
                </Box>
              </Flex>
            </Box>

            <Box bg={bg} p={6} borderRadius="lg" boxShadow="md">
              <Flex align="center">
                <AlertCircle size={30} stroke="#E53E3E" />
                <Box ml={4}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Overdue
                  </Text>
                  <Heading size="lg">{dueData.length}</Heading>
                </Box>
              </Flex>
            </Box>

            <Box bg={bg} p={6} borderRadius="lg" boxShadow="md">
              <Flex align="center">
                <CheckCircle size={30} stroke="#38A169" />
                <Box ml={4}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Completed
                  </Text>
                  <Heading size="lg">{comData.length}</Heading>
                </Box>
              </Flex>
            </Box>
          </Grid>

          {/* Charts and Lists */}
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={6}
            mb={6}
          >
            {/* Activity Chart */}
            <Box bg={bg} p={6} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4}>
                Weekly Activity
              </Heading>
              <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="#3182ce"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>

            {/* Priority Tasks */}
            <Box bg={bg} p={6} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4}>
                Priority Tasks
              </Heading>
              <Stack spacing={4}>
                {priorityTasks.length !== 0 ? (
                  priorityTasks.map((task, i) => (
                    <Flex
                      key={i}
                      justify="space-between"
                      align="center"
                      p={3}
                      bg={colorMode === "light" ? "gray.50" : "gray.800"}
                      borderRadius="md"
                    >
                      <Stack display={"flex"} direction={"row"} align="center">
                        <StyledText fontWeight="medium">
                          {task.title}
                        </StyledText>
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
                      </Stack>
                      <StyledText fontSize="sm" color="gray.500">
                        {task.dueDate}
                      </StyledText>
                    </Flex>
                  ))
                ) : (
                  <StyledText>No Priority Tasks</StyledText>
                )}
              </Stack>
            </Box>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default TaskDashboard;
