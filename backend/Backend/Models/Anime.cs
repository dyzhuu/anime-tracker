using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Anime
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string ImageURL { get; set; }

        public int Description { get; set; }
    }
}

