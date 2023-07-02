using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
	public class User
	{
        [Key]
        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public ICollection<Bookmark> Bookmarks { get; set; }
    }
}