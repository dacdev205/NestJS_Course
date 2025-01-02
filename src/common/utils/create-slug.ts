import slugify from 'slugify';

export function create_slug(raw_name: string) {
  const gen_slug = {
    replacement: '-',
    trim: true,
    lower: true,
  };
  return slugify(raw_name, gen_slug);
}
