namespace Backend.Domain
{
    public class Bookmark
    {
        public int UserId { get; set; }

        public int AnimeId { get; set; }
        
        public virtual User User { get; set; }

        public virtual Anime Anime { get; set; }

        public int Rating { get; set; }

        public Status Status { get; set; }
    }
}
