import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.follow.deleteMany();
  await prisma.review.deleteMany();
  await prisma.track.deleteMany();
  await prisma.album.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.user.deleteMany();

  // Generate Users
  console.log('👥 Creating users...');
  const users: any[] = [];
  for (let i = 0; i < 50; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password(), // In real app, this would be hashed
      },
    });
    users.push(user);
  }

  // Generate Artists
  console.log('🎤 Creating artists...');
  const artists: any[] = [];
  for (let i = 0; i < 30; i++) {
    const artist = await prisma.artist.create({
      data: {
        name: faker.person.fullName(),
      },
    });
    artists.push(artist);
  }

  // Generate Albums
  console.log('💿 Creating albums...');
  const albums: any[] = [];
  for (let i = 0; i < 100; i++) {
    const artist = faker.helpers.arrayElement(artists);
    const album = await prisma.album.create({
      data: {
        title: faker.music.songName(),
        artistId: artist.id,
        releaseDate: faker.date.past({ years: 10 }),
      },
    });
    albums.push(album);
  }

  // Generate Tracks
  console.log('🎵 Creating tracks...');
  const tracks: any[] = [];
  for (let i = 0; i < 500; i++) {
    const album = faker.helpers.arrayElement(albums);
    const artist = faker.helpers.arrayElement(artists);
    const track = await prisma.track.create({
      data: {
        title: faker.music.songName(),
        albumId: album.id,
        artistId: artist.id,
        duration: faker.number.int({ min: 60, max: 600 }), // 1-10 minutes in seconds
      },
    });
    tracks.push(track);
  }

  // Generate Reviews
  console.log('📝 Creating reviews...');
  const reviewTypes = ['album', 'track'];
  
  for (let i = 0; i < 200; i++) {
    const user = faker.helpers.arrayElement(users);
    const reviewType = faker.helpers.arrayElement(reviewTypes);
    
    if (reviewType === 'album') {
      const album = faker.helpers.arrayElement(albums);
      await prisma.review.create({
        data: {
          userId: user.id,
          albumId: album.id,
          rating: faker.number.int({ min: 1, max: 5 }),
          content: faker.lorem.paragraphs(2),
        },
      });
    } else {
      const track = faker.helpers.arrayElement(tracks);
      await prisma.review.create({
        data: {
          userId: user.id,
          trackId: track.id,
          rating: faker.number.int({ min: 1, max: 5 }),
          content: faker.lorem.paragraphs(2),
        },
      });
    }
  }

  // Generate Follows
  console.log('👥 Creating follows...');
  for (let i = 0; i < 150; i++) {
    const follower = faker.helpers.arrayElement(users);
    const following = faker.helpers.arrayElement(users.filter(u => u.id !== follower.id));
    
    // Check if this follow relationship already exists
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: follower.id,
          followingId: following.id,
        },
      },
    });

    if (!existingFollow) {
      await prisma.follow.create({
        data: {
          followerId: follower.id,
          followingId: following.id,
        },
      });
    }
  }

  console.log('✅ Database seeding completed!');
  console.log(`📊 Created:`);
  console.log(`   - ${users.length} users`);
  console.log(`   - ${artists.length} artists`);
  console.log(`   - ${albums.length} albums`);
  console.log(`   - ${tracks.length} tracks`);
  console.log(`   - 200 reviews`);
  console.log(`   - ~150 follows`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 