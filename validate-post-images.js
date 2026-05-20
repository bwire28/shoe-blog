const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, 'posts', 'posts.json');
const uploadsDir = path.join(__dirname, 'uploads');

async function main() {
  const postsData = JSON.parse(await fs.promises.readFile(postsFile, 'utf8'));

  if (!Array.isArray(postsData.posts)) {
    throw new Error('Invalid posts.json structure: expected { posts: [] }');
  }

  const uploadFiles = new Set(
    (await fs.promises.readdir(uploadsDir)).map((file) => file.toLowerCase())
  );

  const referencedImages = new Set();
  const missing = [];
  const invalid = [];

  for (const post of postsData.posts) {
    if (!post.image || typeof post.image !== 'string') {
      invalid.push({ title: post.title || '(untitled)', reason: 'missing or invalid image field' });
      continue;
    }

    const normalized = post.image.replace(/^\/+/u, '');
    const filename = path.basename(normalized).toLowerCase();
    referencedImages.add(filename);

    if (!uploadFiles.has(filename)) {
      missing.push({ title: post.title || '(untitled)', image: post.image });
    }
  }

  const orphaned = [...uploadFiles].filter((file) => !referencedImages.has(file));

  if (missing.length === 0 && invalid.length === 0) {
    console.log('✅ All referenced post images appear in uploads/.');
  } else {
    if (invalid.length > 0) {
      console.log('⚠️ Invalid post image entries:');
      for (const entry of invalid) {
        console.log(` - ${entry.title}: ${entry.reason}`);
      }
    }
    if (missing.length > 0) {
      console.log('❌ Missing images referenced by posts:');
      for (const entry of missing) {
        console.log(` - ${entry.title}: ${entry.image}`);
      }
    }
  }

  if (orphaned.length > 0) {
    console.log('\nℹ️ Uploads present but not referenced by any post:');
    orphaned.forEach((file) => console.log(` - ${file}`));
  }
}

main().catch((error) => {
  console.error('Error validating post images:', error.message);
  process.exit(1);
});
