"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var users, i, user, artists, i, artist, albums, i, artist, album, tracks, i, album, artist, track, reviewTypes, i, user, reviewType, album, track, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🌱 Starting database seeding...');
                    // Clear existing data
                    console.log('🧹 Clearing existing data...');
                    return [4 /*yield*/, prisma.follow.deleteMany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.review.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.track.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.album.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.artist.deleteMany()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 6:
                    _a.sent();
                    // Generate Users
                    console.log('👥 Creating users...');
                    users = [];
                    i = 0;
                    _a.label = 7;
                case 7:
                    if (!(i < 50)) return [3 /*break*/, 10];
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: faker_1.faker.internet.email(),
                                name: faker_1.faker.person.fullName(),
                                password: faker_1.faker.internet.password(), // In real app, this would be hashed
                            },
                        })];
                case 8:
                    user = _a.sent();
                    users.push(user);
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 7];
                case 10:
                    // Generate Artists
                    console.log('🎤 Creating artists...');
                    artists = [];
                    i = 0;
                    _a.label = 11;
                case 11:
                    if (!(i < 30)) return [3 /*break*/, 14];
                    return [4 /*yield*/, prisma.artist.create({
                            data: {
                                name: faker_1.faker.person.fullName(),
                            },
                        })];
                case 12:
                    artist = _a.sent();
                    artists.push(artist);
                    _a.label = 13;
                case 13:
                    i++;
                    return [3 /*break*/, 11];
                case 14:
                    // Generate Albums
                    console.log('💿 Creating albums...');
                    albums = [];
                    i = 0;
                    _a.label = 15;
                case 15:
                    if (!(i < 100)) return [3 /*break*/, 18];
                    artist = faker_1.faker.helpers.arrayElement(artists);
                    return [4 /*yield*/, prisma.album.create({
                            data: {
                                title: faker_1.faker.music.songName(),
                                artistId: artist.id,
                                releaseDate: faker_1.faker.date.past({ years: 10 }),
                            },
                        })];
                case 16:
                    album = _a.sent();
                    albums.push(album);
                    _a.label = 17;
                case 17:
                    i++;
                    return [3 /*break*/, 15];
                case 18:
                    // Generate Tracks
                    console.log('🎵 Creating tracks...');
                    tracks = [];
                    i = 0;
                    _a.label = 19;
                case 19:
                    if (!(i < 500)) return [3 /*break*/, 22];
                    album = faker_1.faker.helpers.arrayElement(albums);
                    artist = faker_1.faker.helpers.arrayElement(artists);
                    return [4 /*yield*/, prisma.track.create({
                            data: {
                                title: faker_1.faker.music.songName(),
                                albumId: album.id,
                                artistId: artist.id,
                                duration: faker_1.faker.number.int({ min: 60, max: 600 }), // 1-10 minutes in seconds
                            },
                        })];
                case 20:
                    track = _a.sent();
                    tracks.push(track);
                    _a.label = 21;
                case 21:
                    i++;
                    return [3 /*break*/, 19];
                case 22:
                    // Generate Reviews
                    console.log('📝 Creating reviews...');
                    reviewTypes = ['album', 'track'];
                    i = 0;
                    _a.label = 23;
                case 23:
                    if (!(i < 200)) return [3 /*break*/, 28];
                    user = faker_1.faker.helpers.arrayElement(users);
                    reviewType = faker_1.faker.helpers.arrayElement(reviewTypes);
                    if (!(reviewType === 'album')) return [3 /*break*/, 25];
                    album = faker_1.faker.helpers.arrayElement(albums);
                    return [4 /*yield*/, prisma.review.create({
                            data: {
                                userId: user.id,
                                albumId: album.id,
                                rating: faker_1.faker.number.int({ min: 1, max: 5 }),
                                content: faker_1.faker.lorem.paragraphs(2),
                            },
                        })];
                case 24:
                    _a.sent();
                    return [3 /*break*/, 27];
                case 25:
                    track = faker_1.faker.helpers.arrayElement(tracks);
                    return [4 /*yield*/, prisma.review.create({
                            data: {
                                userId: user.id,
                                trackId: track.id,
                                rating: faker_1.faker.number.int({ min: 1, max: 5 }),
                                content: faker_1.faker.lorem.paragraphs(2),
                            },
                        })];
                case 26:
                    _a.sent();
                    _a.label = 27;
                case 27:
                    i++;
                    return [3 /*break*/, 23];
                case 28:
                    // Generate Follows
                    console.log('👥 Creating follows...');
                    _loop_1 = function (i) {
                        var follower, following, existingFollow;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    follower = faker_1.faker.helpers.arrayElement(users);
                                    following = faker_1.faker.helpers.arrayElement(users.filter(function (u) { return u.id !== follower.id; }));
                                    return [4 /*yield*/, prisma.follow.findUnique({
                                            where: {
                                                followerId_followingId: {
                                                    followerId: follower.id,
                                                    followingId: following.id,
                                                },
                                            },
                                        })];
                                case 1:
                                    existingFollow = _b.sent();
                                    if (!!existingFollow) return [3 /*break*/, 3];
                                    return [4 /*yield*/, prisma.follow.create({
                                            data: {
                                                followerId: follower.id,
                                                followingId: following.id,
                                            },
                                        })];
                                case 2:
                                    _b.sent();
                                    _b.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 29;
                case 29:
                    if (!(i < 150)) return [3 /*break*/, 32];
                    return [5 /*yield**/, _loop_1(i)];
                case 30:
                    _a.sent();
                    _a.label = 31;
                case 31:
                    i++;
                    return [3 /*break*/, 29];
                case 32:
                    console.log('✅ Database seeding completed!');
                    console.log("\uD83D\uDCCA Created:");
                    console.log("   - ".concat(users.length, " users"));
                    console.log("   - ".concat(artists.length, " artists"));
                    console.log("   - ".concat(albums.length, " albums"));
                    console.log("   - ".concat(tracks.length, " tracks"));
                    console.log("   - 200 reviews");
                    console.log("   - ~150 follows");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error('❌ Error during seeding:', e);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
