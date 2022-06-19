import { faker } from '@faker-js/faker';
import { Doctor, PrismaClient, User } from '@prisma/client';

const DEFAULT_SEED_COUNT = 10;
const args = process.argv.slice(2);
const prisma = new PrismaClient();

const doctorQualifications = ['MBBS', 'BDMS'];
const seedCount = parseInt(args[1]) || DEFAULT_SEED_COUNT;

async function addDoctor() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const user: Omit<User, 'id'> = {
    firstName,
    lastName,
    username: faker.internet.userName(firstName, lastName),
    password: faker.internet.password(),
    email: faker.internet.email(firstName, lastName),
    contact: faker.phone.phoneNumber('+91##########'),
    dateOfBirth: faker.date.birthdate({ min: 25, max: 80, mode: 'age' }).toLocaleDateString(),
    role: 'doctor',
  };

  const id = (await prisma.user.create({ data: user })).id;
  const doctor: Doctor = {
    id,
    experience: `${faker.random.numeric(1)} Years`,
    qualifications: 'MBBS',
    specialization: 'None',
  };

  await prisma.doctor.create({ data: doctor });
}

(async function main() {
  for (const _ of Array.from({ length: seedCount }).keys()) await addDoctor();
})();
