"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../../data/projects";

type ProjectGalleryProps = {
  project: Project | null;
  onClose: () => void;
};

type GalleryPointerStart = {
  x: number;
  y: number;
  panX: number;
  panY: number;
};

export default function ProjectGallery({ project, onClose }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [detailPan, setDetailPan] = useState({ x: 0, y: 0 });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const galleryStageRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<GalleryPointerStart | null>(null);

  const resetDetailView = useCallback(() => {
    pointerStartRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
    setZoomScale(1);
    setDetailPan({ x: 0, y: 0 });
  }, []);

  const closeGallery = useCallback(() => {
    resetDetailView();
    onClose();
  }, [onClose, resetDetailView]);

  const move = useCallback(
    (step: 1 | -1) => {
      if (!project?.images.length) return;

      resetDetailView();
      setDirection(step === 1 ? "next" : "previous");
      setActiveIndex((current) =>
        (current + step + project.images.length) % project.images.length,
      );
    },
    [project, resetDetailView],
  );

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
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
  }, [closeGallery, move, project]);

  if (typeof document === "undefined" || !project || project.images.length === 0) {
    return null;
  }

  const image = project.images[activeIndex];
  const previousImage =
    project.images[(activeIndex - 1 + project.images.length) % project.images.length];
  const nextImage = project.images[(activeIndex + 1) % project.images.length];
  const paddedIndex = String(activeIndex + 1).padStart(2, "0");
  const paddedTotal = String(project.images.length).padStart(2, "0");
  const dragProgress = Math.min(Math.abs(dragOffset) / 170, 1);
  const maxZoom =
    project.slug === "fyxtez-terminal"
      ? 2.65
      : project.slug === "exchange-positions"
        ? 1.85
        : 2.1;
  const isDetailMode = zoomScale > 1.001;

  return createPortal(
    <div
      className="gallery-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) closeGallery();
      }}
    >
      <section
        className="project-gallery"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-project-title"
      >
        <div
          className={`gallery-visual ${isDragging ? "is-dragging" : ""} ${
            isDetailMode ? "is-detail-mode" : ""
          }`}
          onWheel={(event) => {
            if (event.deltaY === 0) return;

            event.preventDefault();
            const zoomDirection = event.deltaY < 0 ? 1 : -1;
            const zoomStep = Math.min(
              0.22,
              Math.max(0.1, Math.abs(event.deltaY) * 0.0016),
            );
            const nextZoom = Math.min(
              maxZoom,
              Math.max(1, zoomScale + zoomDirection * zoomStep),
            );

            if (Math.abs(nextZoom - zoomScale) < 0.001) return;

            const stage = galleryStageRef.current;
            const maxPanX = stage ? ((nextZoom - 1) * stage.clientWidth) / 2 : 0;
            const maxPanY = stage ? ((nextZoom - 1) * stage.clientHeight) / 2 : 0;

            setZoomScale(nextZoom);
            setDetailPan((current) =>
              nextZoom <= 1.001
                ? { x: 0, y: 0 }
                : {
                    x: Math.max(-maxPanX, Math.min(maxPanX, current.x)),
                    y: Math.max(-maxPanY, Math.min(maxPanY, current.y)),
                  },
            );
          }}
          onPointerDown={(event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;

            pointerStartRef.current = {
              x: event.clientX,
              y: event.clientY,
              panX: detailPan.x,
              panY: detailPan.y,
            };
            setDragOffset(0);
            setIsDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (pointerStartRef.current === null) return;

            const distanceX = event.clientX - pointerStartRef.current.x;
            const distanceY = event.clientY - pointerStartRef.current.y;

            if (isDetailMode) {
              const stage = galleryStageRef.current;
              const maxPanX = stage ? ((zoomScale - 1) * stage.clientWidth) / 2 : 260;
              const maxPanY = stage ? ((zoomScale - 1) * stage.clientHeight) / 2 : 220;

              setDetailPan({
                x: Math.max(
                  -maxPanX,
                  Math.min(maxPanX, pointerStartRef.current.panX + distanceX),
                ),
                y: Math.max(
                  -maxPanY,
                  Math.min(maxPanY, pointerStartRef.current.panY + distanceY),
                ),
              });
              return;
            }

            const resistedDistance = Math.max(-170, Math.min(170, distanceX * 0.62));
            setDragOffset(resistedDistance);
          }}
          onPointerUp={(event) => {
            if (pointerStartRef.current === null) return;

            const distanceX = event.clientX - pointerStartRef.current.x;
            const distanceY = event.clientY - pointerStartRef.current.y;
            pointerStartRef.current = null;
            setIsDragging(false);
            setDragOffset(0);

            if (isDetailMode) return;

            if (Math.abs(distanceX) > 54 && Math.abs(distanceX) > Math.abs(distanceY)) {
              move(distanceX < 0 ? 1 : -1);
            }
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
              ref={galleryStageRef}
              className={`gallery-image-stage ${
                project.slug === "exchange-positions" ? "gallery-image-stage--mobile" : ""
              }`}
            >
              {project.images.length > 1 ? (
                <>
                  <div
                    className={`gallery-image-ghost gallery-image-ghost--previous ${
                      isDragging && dragOffset > 8 ? "is-active" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <Image
                      className="gallery-image"
                      src={previousImage.src}
                      alt=""
                      fill
                      draggable={false}
                      unoptimized
                      sizes="(max-width: 900px) 92vw, 68vw"
                    />
                  </div>
                  <div
                    className={`gallery-image-ghost gallery-image-ghost--next ${
                      isDragging && dragOffset < -8 ? "is-active" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <Image
                      className="gallery-image"
                      src={nextImage.src}
                      alt=""
                      fill
                      draggable={false}
                      unoptimized
                      sizes="(max-width: 900px) 92vw, 68vw"
                    />
                  </div>
                </>
              ) : null}
              <span
                className={`gallery-drag-cue gallery-drag-cue--previous ${
                  isDragging && !isDetailMode && dragOffset > 18 ? "is-active" : ""
                }`}
                aria-hidden="true"
              >
                ← Previous
              </span>
              <div
                className={`gallery-image-drag-layer ${isDragging ? "is-dragging" : ""} ${
                  isDetailMode ? "is-detail-mode" : ""
                }`}
                style={{
                  opacity: isDetailMode ? 1 : 1 - dragProgress * 0.1,
                  transform: isDetailMode
                    ? `translate3d(${detailPan.x}px, ${detailPan.y}px, 0) scale(${zoomScale})`
                    : `translate3d(${dragOffset}px, 0, 0) scale(${1 - dragProgress * 0.018})`,
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
                  unoptimized
                  sizes="(max-width: 500px) 240vw, (max-width: 900px) 140vw, 68vw"
                />
              </div>
              <span
                className={`gallery-drag-cue gallery-drag-cue--next ${
                  isDragging && !isDetailMode && dragOffset < -18 ? "is-active" : ""
                }`}
                aria-hidden="true"
              >
                Next →
              </span>
              <output className="gallery-zoom-status" aria-live="polite">
                {Math.round(zoomScale * 100)}%
              </output>
              <button
                className="gallery-detail-toggle"
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => {
                  pointerStartRef.current = null;
                  setDragOffset(0);
                  setIsDragging(false);
                  setDetailPan({ x: 0, y: 0 });
                  setZoomScale((current) => (current > 1.001 ? 1 : maxZoom));
                }}
                aria-pressed={isDetailMode}
              >
                {isDetailMode ? "Fit image −" : "Zoom details +"}
              </button>
            </div>
          </div>
        </div>

        <aside className="gallery-details">
          <button
            ref={closeButtonRef}
            className="gallery-close gallery-close--primary"
            type="button"
            onClick={closeGallery}
            aria-label="Close project gallery"
          >
            Close <span aria-hidden="true">×</span>
          </button>

          <div className="gallery-project-copy">
            <p>{project.category}</p>
            <h2 id="gallery-project-title">{project.title}</h2>
            <span>{project.access}</span>
            <p>{project.description}</p>
            <ul className="gallery-project-tags" aria-label="Project technologies">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
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
                  resetDetailView();
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

          <button
            className="gallery-close gallery-close--secondary"
            type="button"
            onClick={closeGallery}
            aria-label="Close project gallery"
          >
            Close gallery <span aria-hidden="true">×</span>
          </button>

          <p className="gallery-hint">
            {isDetailMode
              ? `Mouse wheel zoom · ${Math.round(zoomScale * 100)}% · Drag image to inspect`
              : "Mouse wheel zoom · Drag to change screenshot · Swipe or zoom on mobile"}
          </p>
        </aside>
      </section>
    </div>,
    document.body,
  );
}
