using System;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Contexts
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{

		}

		public DbSet<Anime> Animes { get; set; }

		public DbSet<SavedAnime> SavedAnimes { get; set; }

		public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			modelBuilder.Entity<SavedAnime>()
				.HasKey(savedAnime => new { savedAnime.AnimeId, savedAnime.UserId });
			modelBuilder.Entity<SavedAnime>()
				.HasOne(savedAnime => savedAnime.User)
				.WithMany(user => user.SavedAnimes)
				.HasForeignKey(savedAnime => savedAnime.AnimeId);
        }
    }
}

