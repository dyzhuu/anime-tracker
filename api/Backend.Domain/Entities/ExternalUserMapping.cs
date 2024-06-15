using System.ComponentModel.DataAnnotations;

public class ExternalUserMapping
{
    [Key]
    public string ExternalId { get; set; }

    public int InternalId { get; set; }
}
