using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class todoController : ControllerBase
    {
        private readonly DataContext _context;
        public todoController(DataContext context) {
            _context= context;
        }

// Endpoints
        [HttpGet]
        public ActionResult<IEnumerable<todoItems>> GetTodos() {
            var todos = _context.todolist.ToList();

            return todos;
        }

        [HttpGet("{id}")]
        public ActionResult<todoItems> GetTodo(int id) {
            var todo = _context.todolist.Find(id);

            if (todo == null)
            {
                return NotFound();
            }

            return todo;
        }

        [HttpPost]
        public ActionResult<todoItems> PostTodoItem(todoItems todoItem) {   
            
            int availableId = FindNextAvailableId();
            todoItem.ID = availableId;
            
            _context.todolist.Add(todoItem);
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{Id}")]
        public ActionResult DeleteTodoItem(int Id) {
            
            var todo =  _context.todolist.Find(Id);

            if (todo == null)
            {
                return NotFound();
            }
            _context.todolist.Remove(todo);
            _context.SaveChanges();

            return NoContent(); 
        }

        [HttpPut("{id}/completed")]
        public ActionResult<todoItems> MarkTodoItem(int id) {
    
            var todo = _context.todolist.FirstOrDefault(todolist => todolist.ID == id);
    
            if (todo == null) {
                return NotFound();
            }
            todo.completed = !todo.completed;
            _context.SaveChanges();
            return Ok(todo);
        }

        private int FindNextAvailableId() {
            // Get all existing IDs from the database
            var existingIds = _context.todolist.Select(t => t.ID).OrderBy(id => id).ToList();

            // Look for the first gap in the sequence
            int availableId = 1;  // Start from ID = 1 (assuming IDs start from 1)
    
            foreach (var id in existingIds) {
                if (id != availableId) {
                    // If there is a gap, return the first missing ID
                    return availableId;
                }
                availableId++;  // Otherwise, move to the next ID
            }

            // If no gaps were found, return the next available ID (MAX(ID) + 1)
            return availableId;
        }
    }
}