"use client"

import Link from "next/link"
import { useState } from "react"
import type { NavLink } from "@/app/lib/types"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks: NavLink[] = [
    { href: "/about", label: "About" },
    // { href: "/school", label: "School" },
    { href: "/events", label: "Events" },
    { href: "/lives", label: "Lives" },
    { href: "/join", label: "Join" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-600">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-gold-600 flex items-center justify-center">
            <div className="w-3 h-3 bg-gold-500" />
          </div>
          <span className="font-serif uppercase text-stone-200 tracking-[0.22em] text-[0.75rem]">Awakening Asia</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="ml-4 px-5 py-2 border border-gold-600 text-gold-400 text-xs tracking-widest uppercase font-medium transition-all duration-200 hover:bg-gold-500 hover:text-dark-900">
            Donate
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu">
          <span className="block w-6 h-px bg-stone-400" />
          <span className="block w-6 h-px bg-stone-400" />
          <span className="block w-6 h-px bg-stone-400" />
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-dark-800 border-t border-dark-600 px-6 py-6 gap-4">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link block py-1" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/donate" className="nav-link block py-1 text-gold-400" onClick={() => setMenuOpen(false)}>
            Donate
          </Link>
        </div>
      )}
    </header>
  )
}
