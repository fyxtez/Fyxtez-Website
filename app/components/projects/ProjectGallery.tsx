"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../../data/projects";

type ProjectGalleryProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectGallery({ project, onClose }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const wheelLockedRef = useRef(false);

  const move = useCallback(
    (step: 1 | -1) => {
      if (!project?.images.length) return;

      setDirection(step === 1 ? "next" : "previous");
      setActiveIndex((current) =>
        (current + step + project.images.length) % project.images.length,
      );
    },
    [project],
  );

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [move, onClose, project]);

  if (typeof document === "undefined" || !project || project.images.length === 0) {
    return null;
  }

  const image = project.images[activeIndex];
  const paddedIndex = String(activeIndex + 1).padStart(2, "0");
  const paddedTotal = String(project.images.length).padStart(2, "0");
  const dragProgress = Math.min(Math.abs(dragOffset) / 170, 1);

  return createPortal(
    <div
      className="gallery-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        className="project-gallery"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-project-title"
      >
        <div
          className={`gallery-visual ${isDragging ? "is-dragging" : ""}`}
          onWheel={(event) => {
            const distance =
              Math.abs(event.deltaX) > Math.abs(event.deltaY)
                ? event.deltaX
                : event.deltaY;

            if (Math.abs(distance) < 32 || wheelLockedRef.current) return;

            wheelLockedRef.current = true;
            move(distance > 0 ? 1 : -1);
            window.setTimeout(() => {
              wheelLockedRef.current = false;
            }, 560);
          }}
          onPointerDown={(event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;

            pointerStartRef.current = { x: event.clientX, y: event.clientY };
            setDragOffset(0);
            setIsDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (pointerStartRef.current === null) return;

            const distanceX = event.clientX - pointerStartRef.current.x;
            const resistedDistance = Math.max(-170, Math.min(170, distanceX * 0.62));
            setDragOffset(resistedDistance);
          }}
          onPointerUp={(event) => {
            if (pointerStartRef.current === null) return;

            const distanceX = event.clientX - pointerStartRef.current.x;
            const distanceY = event.clientY - pointerStartRef.current.y;
            const distance =
              Math.abs(distanceX) >= Math.abs(distanceY) ? distanceX : distanceY;
            pointerStartRef.current = null;
            setIsDragging(false);
            setDragOffset(0);

            if (Math.abs(distance) > 54) move(distance < 0 ? 1 : -1);
          }}
          onPointerCancel={() => {
            pointerStartRef.current = null;
            setIsDragging(false);
            setDragOffset(0);
          }}
        >
          <p className="gallery-kicker">Project gallery</p>

          <div className="gallery-image-frame">
            <div className="gallery-window-bar">
              <span>{project.slug.replaceAll("-", "_")} / {image.label}</span>
              <span className="gallery-window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </div>
            <div
              className={`gallery-image-stage ${
                project.slug === "exchange-positions" ? "gallery-image-stage--mobile" : ""
              }`}
            >
              <span
                className={`gallery-drag-cue gallery-drag-cue--previous ${
                  isDragging && dragOffset > 18 ? "is-active" : ""
                }`}
                aria-hidden="true"
              >
                ← Previous
              </span>
              <div
                className={`gallery-image-drag-layer ${isDragging ? "is-dragging" : ""}`}
                style={{
                  opacity: 1 - dragProgress * 0.1,
                  transform: `translate3d(${dragOffset}px, 0, 0) scale(${1 - dragProgress * 0.018})`,
                }}
              >
                <Image
                  key={`${project.slug}-${activeIndex}`}
                  className={`gallery-image gallery-image--${direction}`}
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  draggable={false}
                  sizes="(max-width: 900px) 92vw, 68vw"
                />
              </div>
              <span
                className={`gallery-drag-cue gallery-drag-cue--next ${
                  isDragging && dragOffset < -18 ? "is-active" : ""
                }`}
                aria-hidden="true"
              >
                Next →
              </span>
            </div>
          </div>
        </div>

        <aside className="gallery-details">
          <button
            ref={closeButtonRef}
            className="gallery-close"
            type="button"
            onClick={onClose}
            aria-label="Close project gallery"
          >
            Close <span aria-hidden="true">×</span>
          </button>

          <div className="gallery-project-copy">
            <p>{project.category}</p>
            <h2 id="gallery-project-title">{project.title}</h2>
            <span>{project.access}</span>
            <p>{project.description}</p>
          </div>

          <div className="gallery-position" aria-live="polite">
            <strong>{paddedIndex}</strong>
            <span>/</span>
            <b>{paddedTotal}</b>
            <small>Screenshots</small>
          </div>

          <div className="gallery-progress" aria-label="Choose screenshot">
            {project.images.map((item, index) => (
              <button
                className={index === activeIndex ? "is-active" : undefined}
                type="button"
                key={item.src}
                onClick={() => {
                  setDirection(index > activeIndex ? "next" : "previous");
                  setActiveIndex(index);
                }}
                aria-label={`Show screenshot ${index + 1}: ${item.label}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>

          <div className="gallery-current-view">
            <small>Current view</small>
            <strong>{image.label}</strong>
            <p>{image.caption}</p>
          </div>

          <div className="gallery-controls">
            <button type="button" onClick={() => move(-1)}>
              <span aria-hidden="true">↑</span> Previous
            </button>
            <button className="gallery-next" type="button" onClick={() => move(1)}>
              Next <span aria-hidden="true">↓</span>
            </button>
          </div>

          {project.href ? (
            <a
              className="gallery-project-link"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              {project.linkLabel} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <p className="gallery-private-note">Private system · Visual case study only</p>
          )}

          <p className="gallery-hint">
            Arrow keys · Mouse drag · Mouse wheel · Swipe on mobile
          </p>
        </aside>
      </section>
    </div>,
    document.body,
  );
}
