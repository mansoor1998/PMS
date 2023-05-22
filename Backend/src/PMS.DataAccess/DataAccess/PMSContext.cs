using Microsoft.EntityFrameworkCore;
using PMS.DataAccess.Models;
using System;

namespace PMS.DataAccess.DataAccess
{
    public class PMSContext : DbContext
    {

        public PMSContext(DbContextOptions options) : base(options) {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            #region Fluent API
            // User Model Config
            modelBuilder.Entity<User>()
               .HasIndex(u => u.Username)
               .IsUnique();


            // Cart Model Config
            //modelBuilder.Entity<Cart>()
            //    .HasOne(c => c.Order)
            //    //.WithMany(o => o.Carts)
            //    //.HasForeignKey(c => c.OrderId)
            //    .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Cart>()
                .HasOne(c => c.Medicine)
                .WithMany(o => o.Carts)
                .HasForeignKey(c => c.MedicineId)
                .OnDelete(DeleteBehavior.Restrict);
            #endregion

            //modelBuilder.ForNpgsqlUseIdentityColumns();
            //modelBuilder.Entity<IEntity>().HasQueryFilter(d => d.IsDeleted == false);

            modelBuilder.SetQueryFilterOnAllEntities<IEntity>(p => p.IsDeleted == false);
        }

        #region Models
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Medicine> Medicines { get; set; }
        public DbSet<MedicalCompany> MedicalCompanies { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        //public DbSet<Invoice> Invoices { get; set; }
        #endregion

    }
}
