"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {
  categories,
  photographs,
  type Category,
  type Photograph,
} from "@/lib/content"
import { Arrow } from "@/components/arrow"

export function Gallery() {
  const [category, setCategory] = useState<Category>("All work")
  const [active, setActive] = useState<Photograph | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const isOpen = active !== null
  const visible = photographs.filter(
    (photo) => category === "All work" || photo.category === category
  )

  useEffect(() => {
    if (!isOpen) return
    const element = dialog.current
    element?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      element?.close()
      document.body.style.overflow = previousOverflow
      opener.current?.focus()
    }
  }, [isOpen])

  function move(direction: number) {
    if (!active) return
    const index = visible.findIndex((photo) => photo.id === active.id)
    setActive(visible[(index + direction + visible.length) % visible.length])
  }

  return (
    <>
      <div className="gallery-toolbar">
        <div className="filters" role="group" aria-label="Filter photographs">
          {categories.map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
              {item === "All work" && <sup>06</sup>}
            </button>
          ))}
        </div>
        <span className="gallery-count" aria-live="polite">
          {String(visible.length).padStart(2, "0")} PHOTOGRAPHS
        </span>
      </div>
      <div className="photo-grid" id="photographs">
        {visible.map((photo, index) => (
          <figure className={`photo-card ${photo.shape}`} key={photo.id}>
            <button
              className="photo-open"
              aria-label={`View ${photo.title}`}
              onClick={(event) => {
                opener.current = event.currentTarget
                setActive(photo)
              }}
            >
              <span className="photo-image">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 700px) 90vw, 44vw"
                />
                <span className="photo-view">
                  VIEW PHOTOGRAPH <Arrow diagonal />
                </span>
              </span>
            </button>
            <figcaption>
              <div>
                <span className="photo-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{photo.title}</h3>
              </div>
              <span>
                {photo.category} / {photo.year}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="gallery-end">
        <span /> A small collection, a world of stories. <span />
      </p>
      {active && (
        <dialog
          ref={dialog}
          className="lightbox"
          aria-labelledby="photo-title"
          onCancel={() => setActive(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActive(null)
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault()
              move(1)
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault()
              move(-1)
            }
          }}
        >
          <div className="lightbox-inner">
            <div className="lightbox-top">
              <span>
                {active.category} / {active.year}
              </span>
              <button
                autoFocus
                onClick={() => setActive(null)}
                aria-label="Close photograph"
              >
                CLOSE <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="lightbox-image">
              <Image src={active.src} alt={active.alt} fill sizes="90vw" />
            </div>
            <div className="lightbox-bottom">
              <button onClick={() => move(-1)} aria-label="Previous photograph">
                ←
              </button>
              <div>
                <h3 id="photo-title">{active.title}</h3>
                <p>
                  {active.location} ·{" "}
                  {visible.findIndex((photo) => photo.id === active.id) + 1} /{" "}
                  {visible.length}
                </p>
              </div>
              <button onClick={() => move(1)} aria-label="Next photograph">
                →
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  )
}
