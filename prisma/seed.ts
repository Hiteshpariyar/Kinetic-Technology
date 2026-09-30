// prisma/seed.ts
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create core roles if they don't exist
  const roleNames = ["Super Admin", "Admin", "Project Manager", "Developer", "Designer", "QA", "Sales", "Support", "Client"]; 
  const roleMap: Record<string, Role> = {} as any;
  for (const name of roleNames) {
    const existing = await prisma.role.findUnique({ where: { name } });
    if (!existing) {
      const role = await prisma.role.create({ data: { name, description: `${name} role` } });
      roleMap[name] = role;
      console.log(`Created role: ${name}`);
    } else {
      roleMap[name] = existing;
      console.log(`Role already exists: ${name}`);
    }
  }

  // Create a default Super Admin user (dev only)
  const adminEmail = "admin@example.com";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("Password123!", 12);
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: "Super Admin",
        roleId: roleMap["Super Admin"].id,
      },
    });
    console.log(`Created Super Admin user: ${adminEmail} (password: Password123!)`);
  } else {
    console.log(`Super Admin already exists: ${adminEmail}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

