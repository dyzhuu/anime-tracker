using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
	public class SavedAnime
	{
        public int UserId { get; set; }

		public int AnimeId { get; set; }
        
        public User User { get; set; }

        public Anime Anime { get; set; }

        public int Review { get; set; }

        public STATUS status { get; set; }
    }

    public enum STATUS
    {
        Watching,
        Completed,
        PlanToWatch,
        Dropped
    }
}

