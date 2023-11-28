export const brandsLogo = [
  {
    id: 1,
    logo: "/samsung.webp",
  },
  {
    id: 2,
    logo: "/apple.webp",
  },
  {
    id: 3,
    logo: "/google.webp",
  },
  {
    id: 4,
    logo: "/oneplus.webp",
  },
  {
    id: 5,
    logo: "/oppo.webp",
  },
  {
    id: 6,
    logo: "/vivo.webp",
  },
  {
    id: 7,
    logo: "/huawei.webp",
  },
  {
    id: 8,
    logo: "/zte.webp",
  },
  {
    id: 9,
    logo: "/htc.webp",
  },
  {
    id: 10,
    logo: "/lenovo.webp",
  },
  {
    id: 11,
    logo: "/blackberry.webp",
  },
  {
    id: 12,
    logo: "/mi.webp",
  },
  {
    id: 13,
    logo: "/lg.webp",
  },
  {
    id: 14,
    logo: "/motorola.webp",
  },
  {
    id: 15,
    logo: "/realme.webp",
  },
  {
    id: 16,
    logo: "/rivo.webp",
  },
  {
    id: 17,
    logo: "/alcatel.webp",
  },
  {
    id: 18,
    logo: "/dcode.webp",
  },
  {
    id: 19,
    logo: "/infinix.webp",
  },
  {
    id: 20,
    logo: "/sony.webp",
  },
  {
    id: 21,
    logo: "/techno.webp",
  },
];

export const RamOptions = [
  { value: "1GB", label: "1GB" },
  { value: "2GB", label: "2GB" },
  { value: "4GB", label: "4GB" },
  { value: "8GB", label: "8GB" },
  { value: "16GB", label: "16GB" },
  { value: "18GB", label: "18GB" },
  { value: "24GB", label: "24GB" },
];

export const StorageOptions = [
  { value: "16GB", label: "16GB" },
  { value: "32GB", label: "32GB" },
  { value: "64GB", label: "64GB" },
  { value: "128GB", label: "128GB" },
  { value: "256GB", label: "256GB" },
  { value: "512GB", label: "512GB" },
  { value: "1TB", label: "1TB" },
];

export const WarrantyOptions = Array.from({ length: 12 }, (_, index) => ({
  value: `${index + 1} month${index !== 0 ? "s" : ""}`,
  label: `${index + 1} month${index !== 0 ? "s" : ""}`,
}));
