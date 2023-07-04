using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Models
{
    public class Anime
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string ImageURL { get; set; }

        public string Description { get; set; }

        public ICollection<Bookmark> Bookmarks { get; set; }

    }
}

