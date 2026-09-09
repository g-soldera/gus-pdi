import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function uploadResourceImages() {
  const { data: resources, error } = await supabase.from('resources').select('*');
  if (error || !resources) {
    console.error('Error fetching resources:', error);
    return;
  }

  for (const res of resources) {
    if (res.image && res.image.startsWith('/assets/')) {
      const localPath = path.join(process.cwd(), 'public', res.image.replace(/^\//, ''));
      if (fs.existsSync(localPath)) {
        const fileBuffer = fs.readFileSync(localPath);
        const fileName = path.basename(localPath);
        const ext = path.extname(fileName).replace('.', '') || 'jpeg';
        const mimeType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
        const storagePath = `resources/${fileName}`;

        const { error: uploadErr } = await supabase.storage
          .from('resource-images')
          .upload(storagePath, fileBuffer, { contentType: mimeType, upsert: true });

        if (uploadErr) {
          console.error('Failed to upload', fileName, uploadErr.message);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from('resource-images')
            .getPublicUrl(storagePath);

          const publicUrl = publicUrlData.publicUrl;
          await supabase.from('resources').update({ image: publicUrl }).eq('id', res.id);
          console.log(`Updated resource ${res.id} image to ${publicUrl}`);
        }
      } else {
        console.warn(`Local file not found: ${localPath}`);
      }
    }
  }
}

uploadResourceImages();
