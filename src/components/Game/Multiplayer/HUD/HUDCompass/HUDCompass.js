import React, { useCallback, useEffect, useRef } from "react"
import "./HUDCompass.scss"

const DIRECTIONS = ["NW", "N", "NE", "E", "SE", "S", "SW", "W"]
const LINES_COUNT = 8

const COMPASS_CONFIG = {
  containerWidth: 15,
  labelWidth: 1.5,
  latitudePadding: 2.625,
  latitudeWidth: 6.75,
  pixelsPerDegrees: 0.15,
  focusThreshold: 30,
  translateOffset: 2.65,
  lineSpacing: 0.328125,
  lineOffset: 2.38125,
}

const HUDCompass = ({ panorama }) => {
  const labelRefs = useRef(DIRECTIONS.map(() => React.createRef()))
  const animationFrameRef = useRef()

  const latitudesArrayWidth =
    (1 + 2 * DIRECTIONS.length) * (COMPASS_CONFIG.latitudeWidth / 2) -
    COMPASS_CONFIG.latitudeWidth / 2

  const calculateLabelScale = (position) => {
    const distanceFromCenter = Math.abs(
      position - COMPASS_CONFIG.containerWidth / 2
    )
    const scaleFactor =
      COMPASS_CONFIG.focusThreshold -
      distanceFromCenter / COMPASS_CONFIG.pixelsPerDegrees
    return 1 + scaleFactor / 60
  }

  const updateLabel = useCallback(
    (labelRef, index, heading) => {
      if (!labelRef.current) return

      const labelCenter = (COMPASS_CONFIG.latitudeWidth / 2) * (1 + 2 * index)
      let position = -heading * COMPASS_CONFIG.pixelsPerDegrees + labelCenter
      const padding = COMPASS_CONFIG.latitudePadding + COMPASS_CONFIG.labelWidth

      if (position < -padding) position += latitudesArrayWidth
      if (position > latitudesArrayWidth - padding)
        position -= latitudesArrayWidth

      const isInFocus =
        Math.abs(position - COMPASS_CONFIG.containerWidth / 2) <
        COMPASS_CONFIG.focusThreshold * COMPASS_CONFIG.pixelsPerDegrees

      if (isInFocus) {
        const labelElement = labelRef.current.querySelector("#latitude-label")
        if (labelElement) {
          const scale = calculateLabelScale(position)
          labelElement.style.transform = `scale(${scale})`
        }
      }

      const translateX = position - labelCenter
      labelRef.current.style.transform = `translate(${
        translateX - COMPASS_CONFIG.translateOffset
      }rem)`
    },
    [latitudesArrayWidth]
  )

  const updateCompass = useCallback(
    (heading) => {
      animationFrameRef.current = requestAnimationFrame(() => {
        labelRefs.current.forEach((labelRef, index) =>
          updateLabel(labelRef, index, heading)
        )
      })
    },
    [updateLabel]
  )

  useEffect(() => {
    if (!panorama) return

    const povChangedListener = panorama.addListener("pov_changed", () => {
      updateCompass(panorama.getPov().heading)
    })

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      povChangedListener.remove()
    }
  }, [panorama, updateCompass])

  const renderLatitudeLines = () =>
    [...Array(LINES_COUNT)].map((_, i) => (
      <span
        key={i}
        className="panorama-compass_latitudeLines"
        style={{
          left: `${
            i * 2 * COMPASS_CONFIG.lineSpacing - COMPASS_CONFIG.lineOffset
          }rem`,
        }}
      />
    ))

  return (
    <div className="game-panorama_compass">
      <div className="panorama-compass_compassContainer">
        <div className="panorama-compass_compass">
          {DIRECTIONS.map((dir, index) => (
            <div
              key={index}
              ref={labelRefs.current[index]}
              className="panorama-compass_latitude"
              style={{ width: `${COMPASS_CONFIG.latitudeWidth}rem` }}
            >
              {renderLatitudeLines(index)}
              <span
                id="latitude-label"
                className="panorama-compass_latitudeLabel"
              >
                {dir}
              </span>
            </div>
          ))}
        </div>
        <div className="panorama-compass_topIndicator" />
        <div className="panorama-compass_bottomIndicator" />
      </div>
    </div>
  )
}

export default React.memo(HUDCompass)
