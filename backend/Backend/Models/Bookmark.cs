﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
	public class Bookmark
	{
        public int UserId { get; set; }

        public int AnimeId { get; set; }
        
        public virtual User User { get; set; }

        public virtual Anime Anime { get; set; }

        public int Review { get; set; }

        public Status Status { get; set; }
    }

    public enum Status
    {
        Watching,
        Completed,
        PlanToWatch,
        Dropped
    }
}
