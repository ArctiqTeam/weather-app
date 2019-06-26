import os

from locust import TaskSet, task, HttpLocust

QUIET_MODE = True if os.getenv("QUIET_MODE", "true").lower() in ['1', 'true', 'yes'] else False
TASK_DELAY = int(os.getenv("TASK_DELAY", "1000"))

DATA_SOURCE_PATH = "data.csv"


def log(message):
    if not QUIET_MODE:
        print(message)


class TestBehaviour(TaskSet):

    @task
    def task1(self):
        log("Open home page.")
        self.client.get("/")
        
    @task
    def task2(self):
        log("Get 404 error.")
        self.client.get("/non-existent-page.htm")
        
    @task
    def task3(self):
        log("Get weather for Toronto.")
        self.client.post("/", {"city":"toronto"})
        
    @task
    def task4(self):
        log("Get weather for Vancouver.")
        self.client.post("/", {"city":"vancouver"})
        
    @task
    def task5(self):
        log("Get weather for Ottawa.")
        self.client.post("/", {"city":"ottawa"})


class TestUser(HttpLocust):
    task_set = TestBehaviour
    min_wait = TASK_DELAY
    max_wait = TASK_DELAY
