using Microsoft.EntityFrameworkCore;
using Backend.Core.Models;

namespace Backend.Infrastructure.Contexts
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
		}

		public DbSet<Anime> Animes { get; set; }

		public DbSet<Bookmark> Bookmarks { get; set; }

		public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bookmark>()
				.HasKey(b => new { b.AnimeId, b.UserId });
			modelBuilder.Entity<Bookmark>()
				.HasOne(b => b.User)
				.WithMany(user => user.Bookmarks)
				.HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);
			modelBuilder.Entity<Bookmark>()
				.HasOne(b => b.Anime)
				.WithMany(a => a.Bookmarks)
				.HasForeignKey(b => b.AnimeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Bookmarks)
                .WithOne(b => b.User)
				.HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

