using System;
namespace Backend.Core.Interfaces
{
	public interface IExternalUserMappingRepository
	{
        Task<ExternalUserMapping> GetByExternalId(string externalId);
        Task AddMapping(string externalId, int internalId);
    }
}

