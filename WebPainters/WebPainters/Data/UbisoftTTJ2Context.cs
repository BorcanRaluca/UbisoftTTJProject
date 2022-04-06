using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebPainters.Data
{
    public partial class UbisoftTTJ2Context : DbContext
    {
        public UbisoftTTJ2Context()
        {
        }

        public UbisoftTTJ2Context(DbContextOptions<UbisoftTTJ2Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Developer> Developers { get; set; } = null!;
        public virtual DbSet<Game> Games { get; set; } = null!;
        public virtual DbSet<Rating> Ratings { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-HU9DPGB;Initial Catalog=UbisoftTTJ;Integrated Security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Developer>(entity =>
            {
                entity.ToTable("Developer");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.FoundingDate).HasColumnType("date");

                entity.Property(e => e.Headquartes).HasMaxLength(100);

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Game>(entity =>
            {
                entity.ToTable("Game");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.DeveloperId).HasColumnName("DeveloperID");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.ReleaseDate).HasColumnType("datetime");

                entity.Property(e => e.Type).HasMaxLength(255);

                entity.HasOne(d => d.Developer)
                    .WithMany(p => p.Games)
                    .HasForeignKey(d => d.DeveloperId)
                    .HasConstraintName("FK__Game__DeveloperID");
            });

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Comment).HasMaxLength(500);

                entity.Property(e => e.GameId).HasColumnName("GameID");

                entity.Property(e => e.UserName).HasMaxLength(255);

                entity.HasOne(d => d.Game)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.GameId)
                    .HasConstraintName("FK_ratings_gameID");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
