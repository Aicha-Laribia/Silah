import {
  Banknote,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Droplets,
  Globe2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Home,
  Hospital,
  Info,
  Landmark,
  Map,
  MapPin,
  MoonStar,
  Package,
  Pill,
  Scale,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  UserRound,
  UsersRound
} from 'lucide-react'

export const roleIcons = {
  muslim: UserRound,
  masjid: Landmark,
  org: Building2,
  hospital: Hospital
}

export const needIcons = {
  blood: Droplets,
  food: ShoppingBasket,
  orphan: MoonStar,
  medical: Pill,
  shelter: Home,
  student: GraduationCap,
  funeral: HandHeart,
  traveler: MapPin,
  women: UsersRound
}

export const eventIcons = {
  salah: Landmark,
  halaqa: BookOpen,
  volunteer: HandHeart,
  eid: Sparkles
}

export const navIcons = {
  map: Map,
  zakat: Scale,
  events: CalendarDays,
  profile: UserRound
}

export const moneyIcons = {
  cash: Banknote,
  savings: Landmark,
  gold: Sparkles,
  business: Package,
  investments: CircleDollarSign
}

export const profileIcons = {
  supported: HandHeart,
  needs: MapPin,
  gatherings: Landmark,
  time: Clock3,
  notifications: Bell,
  location: MapPin,
  masjid: Landmark,
  language: Globe2,
  trusted: ShieldCheck,
  info: Info
}

export function ThemedIcon({ icon: Icon, size = 20, strokeWidth = 2, style }) {
  if (!Icon) return null
  return <Icon size={size} strokeWidth={strokeWidth} style={{ display: 'block', ...style }} />
}

export function needMarkerSvg(type, color = '#0a6e5f') {
  const paths = {
    blood: '<path d="M12 2.5C9 6 6 9.8 6 13.5a6 6 0 0 0 12 0C18 9.8 15 6 12 2.5Z"/><path d="M9.5 14.5c.7 1.2 1.7 1.8 3 1.8"/>',
    food: '<path d="M6 10h12l-1.2 9H7.2L6 10Z"/><path d="M9 10V8a3 3 0 0 1 6 0v2"/><path d="M8 14h8"/>',
    orphan: '<path d="M17 3.5A8 8 0 1 0 20.5 17 7 7 0 1 1 17 3.5Z"/>',
    medical: '<path d="m10.5 20 9.1-9.1a4 4 0 0 0-5.7-5.7L4.8 14.3a4 4 0 0 0 5.7 5.7Z"/><path d="m8.5 10.5 5 5"/>',
    shelter: '<path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    student: '<path d="m22 10-10-5-10 5 10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    funeral: '<path d="M12 21s7-4.5 7-11a4 4 0 0 0-7-2.7A4 4 0 0 0 5 10c0 6.5 7 11 7 11Z"/><path d="M12 8v6"/><path d="M9 11h6"/>',
    traveler: '<path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    women: '<path d="M16 11a4 4 0 1 0-8 0"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/><path d="M12 15v6"/>'
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round">${paths[type] || paths.food}</svg>`
}
