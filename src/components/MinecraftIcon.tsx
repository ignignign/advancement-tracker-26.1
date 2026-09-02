import React from 'react';
import {
  Pickaxe,
  Hammer,
  Anvil,
  ShieldCheck,
  Flame,
  Wrench,
  Shield,
  Box,
  Gem,
  BookOpen,
  HeartPulse,
  Eye,
  Sparkles,
  Target,
  Castle,
  Layers,
  FastForward,
  ShieldAlert,
  Droplets,
  Coins,
  Navigation,
  Ghost,
  PackageOpen,
  Skull,
  Zap,
  BatteryCharging,
  Compass,
  MapPin,
  FlaskConical,
  Sun,
  EyeOff,
  Sword,
  Egg,
  DoorOpen,
  RotateCcw,
  Wind,
  Building2,
  Feather,
  ArrowUpCircle,
  HeartHandshake,
  Flag,
  Library,
  Shirt,
  Crosshair,
  Mountain,
  Paintbrush,
  Footprints,
  Bed,
  Award,
  Heart,
  Package,
  Disc,
  Boxes,
  Lightbulb,
  Key,
  KeyRound,
  Wheat,
  Ship,
  Fish,
  Milk,
  Bomb,
  Sprout,
  Cake,
  Cat,
  Link,
  Apple,
  Shovel,
  Flower2,
  Dog,
  Scissors,
  CheckCircle2,
  Circle
} from 'lucide-react';

interface MinecraftIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const MinecraftIcon: React.FC<MinecraftIconProps> = ({ name, className = 'w-5 h-5', size }) => {
  const iconProps = { className, size };

  switch (name) {
    case 'Pickaxe': return <Pickaxe {...iconProps} />;
    case 'Hammer': return <Hammer {...iconProps} />;
    case 'Anvil': return <Anvil {...iconProps} />;
    case 'ShieldCheck': return <ShieldCheck {...iconProps} />;
    case 'Flame': return <Flame {...iconProps} />;
    case 'Wrench': return <Wrench {...iconProps} />;
    case 'Shield': return <Shield {...iconProps} />;
    case 'Box': return <Box {...iconProps} />;
    case 'Gem': return <Gem {...iconProps} />;
    case 'BookOpen': return <BookOpen {...iconProps} />;
    case 'HeartPulse': return <HeartPulse {...iconProps} />;
    case 'Eye': return <Eye {...iconProps} />;
    case 'Sparkles': return <Sparkles {...iconProps} />;
    case 'Target': return <Target {...iconProps} />;
    case 'Castle': return <Castle {...iconProps} />;
    case 'Layers': return <Layers {...iconProps} />;
    case 'FastForward': return <FastForward {...iconProps} />;
    case 'ShieldAlert': return <ShieldAlert {...iconProps} />;
    case 'Droplets': return <Droplets {...iconProps} />;
    case 'Coins': return <Coins {...iconProps} />;
    case 'Navigation': return <Navigation {...iconProps} />;
    case 'Ghost': return <Ghost {...iconProps} />;
    case 'PackageOpen': return <PackageOpen {...iconProps} />;
    case 'Skull': return <Skull {...iconProps} />;
    case 'Zap': return <Zap {...iconProps} />;
    case 'BatteryCharging': return <BatteryCharging {...iconProps} />;
    case 'Compass': return <Compass {...iconProps} />;
    case 'MapPin': return <MapPin {...iconProps} />;
    case 'FlaskConical': return <FlaskConical {...iconProps} />;
    case 'Sun': return <Sun {...iconProps} />;
    case 'EyeOff': return <EyeOff {...iconProps} />;
    case 'Sword': return <Sword {...iconProps} />;
    case 'Egg': return <Egg {...iconProps} />;
    case 'DoorOpen': return <DoorOpen {...iconProps} />;
    case 'RotateCcw': return <RotateCcw {...iconProps} />;
    case 'Wind': return <Wind {...iconProps} />;
    case 'Building2': return <Building2 {...iconProps} />;
    case 'Feather': return <Feather {...iconProps} />;
    case 'ArrowUpCircle': return <ArrowUpCircle {...iconProps} />;
    case 'HeartHandshake': return <HeartHandshake {...iconProps} />;
    case 'Flag': return <Flag {...iconProps} />;
    case 'Library': return <Library {...iconProps} />;
    case 'Shirt': return <Shirt {...iconProps} />;
    case 'Crosshair': return <Crosshair {...iconProps} />;
    case 'Mountain': return <Mountain {...iconProps} />;
    case 'Paintbrush': return <Paintbrush {...iconProps} />;
    case 'Footprints': return <Footprints {...iconProps} />;
    case 'Bed': return <Bed {...iconProps} />;
    case 'Award': return <Award {...iconProps} />;
    case 'Heart': return <Heart {...iconProps} />;
    case 'Package': return <Package {...iconProps} />;
    case 'Disc': return <Disc {...iconProps} />;
    case 'Boxes': return <Boxes {...iconProps} />;
    case 'Lightbulb': return <Lightbulb {...iconProps} />;
    case 'Key': return <Key {...iconProps} />;
    case 'KeyRound': return <KeyRound {...iconProps} />;
    case 'Wheat': return <Wheat {...iconProps} />;
    case 'Ship': return <Ship {...iconProps} />;
    case 'Fish': return <Fish {...iconProps} />;
    case 'Bucket': return <Milk {...iconProps} />;
    case 'Bomb': return <Bomb {...iconProps} />;
    case 'Sprout': return <Sprout {...iconProps} />;
    case 'Cake': return <Cake {...iconProps} />;
    case 'Cat': return <Cat {...iconProps} />;
    case 'Link': return <Link {...iconProps} />;
    case 'Apple': return <Apple {...iconProps} />;
    case 'Shovel': return <Shovel {...iconProps} />;
    case 'Flower2': return <Flower2 {...iconProps} />;
    case 'Dog': return <Dog {...iconProps} />;
    case 'Scissors': return <Scissors {...iconProps} />;
    case 'CraftingTable': return <Box {...iconProps} />;
    case 'Dungeon': return <Castle {...iconProps} />;
    case 'CheckCircle': return <CheckCircle2 {...iconProps} />;
    default: return <Circle {...iconProps} />;
  }
};
