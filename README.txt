Build a To-Do Application 
 
Objective: 
 
Develop a basic To-Do application with: 
	•	Frontend: Angular 
	•	Backend: ASP.NET Core Web API 
	•	Database: In-Memory Database 
	•	Containers: Both applications should be containerized using Docker 
 
Requirements 
 
Backend (ASP.NET Core Web API) 
 
Develop a Web API with the following functionality: 
 
Candidate will have to create the entities and the relationships on his own. 
	1.	Get all To-Do items 
	•	Endpoint: GET /api/todo 
	•	Returns a list of all to-do items. 
	2.	Get a single To-Do item by ID 
	•	Endpoint: GET /api/todo/{id} 
	•	Returns a single to-do item. 
	3.	Create a new To-Do item 
	•	Endpoint: POST /api/todo 
	•	Request body 
	•	Returns the created item with an assigned id. 
	4.	Delete a To-Do item 
	•	Endpoint: DELETE /api/todo/{id} 
	•	Deletes the specified item. 
	5.	Mark a To-Do item as done 
	•	Endpoint: PUT /api/todo/{id}/done 
	•	Updates the item to mark it as completed. 
 
Additional Notes: 
	•	Use Entity Framework Core with an in-memory database. 
	•	Implement dependency injection. 
	•	Follow RESTful API principles. 
	•	Expose API documentation via Swagger. 
 
Frontend (Angular) 
 
Develop an Angular application with the following features: 
	1.	Display a list of To-Do items 
	•	Calls the API to fetch all items. 
	•	Displays a list of tasks with their status (Pending/Done). 
	2.	Create a new To-Do item 
	•	A simple form to add a new task. 
	3.	Mark an item as done 
	•	Button to update the task’s status. 
	4.	Delete a To-Do item 
	•	Button to remove a task. 
 
Additional Notes: 
	•	Use Angular services to interact with the API. 
	•	Apply basic styling (CSS/Bootstrap). 
 
Containerization 
 
Both applications should be containerized using Docker: 
	•	Create a Dockerfile for the backend and another for the frontend. 
	•	Define a docker-compose.yml file to orchestrate both services. 
	•	The frontend should communicate with the backend via a Docker network. 
 
Bonus (Optional, but appreciated) 
	•	Use RxJS for state management in Angular. 
	•	Use a Repository Pattern in the API. 
 
Submission 
 
The candidate should provide: 
	•	A GitHub repository with the full source code. 
	•	A README.md with setup instructions (how to run the app using Docker). 