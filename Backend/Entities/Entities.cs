using Microsoft.AspNetCore.SignalR;

namespace API.Entities
{
    public class todoItems
    {
        public int ID { get; set; }
        public string itemTitle { get; set; }

        public string description { get; set; }

        public bool completed { get; set; }

    }
}