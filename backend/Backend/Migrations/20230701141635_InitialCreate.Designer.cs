﻿// <auto-generated />
using Backend.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230701141635_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Backend.Models.Anime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Description")
                        .HasColumnType("int");

                    b.Property<string>("ImageURL")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Title")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Animes");
                });

            modelBuilder.Entity("Backend.Models.SavedAnime", b =>
                {
                    b.Property<int>("AnimeId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("AnimeId1")
                        .HasColumnType("int");

                    b.Property<int>("Review")
                        .HasColumnType("int");

                    b.Property<int>("status")
                        .HasColumnType("int");

                    b.HasKey("AnimeId", "UserId");

                    b.HasIndex("AnimeId1");

                    b.ToTable("SavedAnimes");
                });

            modelBuilder.Entity("Backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Backend.Models.SavedAnime", b =>
                {
                    b.HasOne("Backend.Models.User", "User")
                        .WithMany("SavedAnimes")
                        .HasForeignKey("AnimeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Models.Anime", "Anime")
                        .WithMany()
                        .HasForeignKey("AnimeId1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Anime");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Backend.Models.User", b =>
                {
                    b.Navigation("SavedAnimes");
                });
#pragma warning restore 612, 618
        }
    }
}
