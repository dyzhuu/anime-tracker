using System;
using Backend.Models;

namespace Backend.Repositories
{
	public interface IUserRepository
	{
		ICollection<User> GetUsers();

		User GetUser(string username);

		ICollection<SavedAnime> GetSavedAnimes();

		SavedAnime GetSavedAnime(int id);

		SavedAnime GetSavedAnime(string title);

		bool SaveAnimeExists(int id);
	}
}

