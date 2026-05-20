export type BreedItem = {
  id: string
  reference_image_id: string
  name: string
  breed_group: string | null
  cfa_url: string
  origin: string
  country_codes: string
  country_code: string
  description: string
  life_span: string
  alt_names: string
  weight: {
    imperial: string
    metric: string
  }
};
