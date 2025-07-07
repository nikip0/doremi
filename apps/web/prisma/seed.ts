import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create fake users
  const users = await prisma.user.createMany({
    data: Array.from({ length: 5 }).map(() => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
    })),
    skipDuplicates: true,
  });

  // Get all users
  const allUsers = await prisma.user.findMany();

  // Create fake artists
  const artists = await prisma.artist.createMany({
    data: Array.from({ length: 3 }).map(() => ({
      name: faker.music.band(),
    })),
    skipDuplicates: true,
  });

  // Get all artists
  const allArtists = await prisma.artist.findMany();

  // Create albums for each artist
  for (const artist of allArtists) {
    await prisma.album.create({
      data: {
        title: faker.music.album(),
        artistId: artist.id,
        releaseDate: faker.date.past(),
      },
    });
  }

  // Get all albums
  const allAlbums = await prisma.album.findMany();

  // Create tracks for each album
  for (const album of allAlbums) {
    await prisma.track.create({
      data: {
        title: faker.music.songName(),
        albumId: album.id,
        artistId: album.artistId,
        duration: faker.number.int({ min: 120, max: 400 }),
      },
    });
  }

  // Get all tracks
  const allTracks = await prisma.track.findMany();

  // Create reviews for albums and tracks
  for (const user of allUsers) {
    // Album review
    await prisma.review.create({
      data: {
        userId: user.id,
        albumId: faker.helpers.arrayElement(allAlbums).id,
        rating: faker.number.int({ min: 1, max: 5 }),
        content: faker.lorem.sentences(2),
      },
    });
    // Track review
    await prisma.review.create({
      data: {
        userId: user.id,
        trackId: faker.helpers.arrayElement(allTracks).id,
        rating: faker.number.int({ min: 1, max: 5 }),
        content: faker.lorem.sentences(2),
      },
    });
  }

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 