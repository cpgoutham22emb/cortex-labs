"use client";

import { useState } from "react";
import { Camera, CheckCircle2, Mic, Maximize2 } from "lucide-react";

interface ProctoringCheckProps {
  requireFullscreen: boolean;
  onReady: (data: {
    camera_ready: boolean;
    microphone_ready: boolean;
    fullscreen_ready: boolean;
  }) => void;
}

export default function ProctoringCheck({
  requireFullscreen,
  onReady,
}: ProctoringCheckProps) {
  const [cameraReady, setCameraReady] = useState(false);
  const [microphoneReady, setMicrophoneReady] = useState(false);
  const [fullscreenReady, setFullscreenReady] = useState(
    !requireFullscreen,
  );

  async function checkCamera() {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      stream.getTracks().forEach((track) => {
        track.stop();
      });

      setCameraReady(true);
    } catch (error) {
      console.error(
        "Camera permission failed:",
        error,
      );

      setCameraReady(false);
    }
  }

  async function checkMicrophone() {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      stream.getTracks().forEach((track) => {
        track.stop();
      });

      setMicrophoneReady(true);
    } catch (error) {
      console.error(
        "Microphone permission failed:",
        error,
      );

      setMicrophoneReady(false);
    }
  }

  async function enableFullscreen() {
    try {
      await document.documentElement.requestFullscreen();

      setFullscreenReady(true);
    } catch (error) {
      console.error(
        "Fullscreen request failed:",
        error,
      );

      setFullscreenReady(false);
    }
  }

  const ready =
    cameraReady &&
    microphoneReady &&
    fullscreenReady;

  return (
    <div className="rounded-[24px] border border-white/[0.08] bg-[#090d14] p-6 sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Proctoring Check
        </p>

        <h2 className="mt-3 text-xl font-semibold text-white">
          Prepare your environment
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/40">
          Before starting the assessment, please verify
          the required permissions.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={checkCamera}
          className="flex w-full items-center gap-4 rounded-xl border border-white/[0.08] px-4 py-4 text-left transition hover:bg-white/[0.04]"
        >
          <Camera
            size={20}
            className={
              cameraReady
                ? "text-emerald-400"
                : "text-white/40"
            }
          />

          <div className="flex-1">
            <p className="text-sm font-medium text-white">
              Camera
            </p>

            <p className="mt-1 text-xs text-white/35">
              {cameraReady
                ? "Camera ready"
                : "Allow camera access"}
            </p>
          </div>

          {cameraReady && (
            <CheckCircle2
              size={18}
              className="text-emerald-400"
            />
          )}
        </button>

        <button
          type="button"
          onClick={checkMicrophone}
          className="flex w-full items-center gap-4 rounded-xl border border-white/[0.08] px-4 py-4 text-left transition hover:bg-white/[0.04]"
        >
          <Mic
            size={20}
            className={
              microphoneReady
                ? "text-emerald-400"
                : "text-white/40"
            }
          />

          <div className="flex-1">
            <p className="text-sm font-medium text-white">
              Microphone
            </p>

            <p className="mt-1 text-xs text-white/35">
              {microphoneReady
                ? "Microphone ready"
                : "Allow microphone access"}
            </p>
          </div>

          {microphoneReady && (
            <CheckCircle2
              size={18}
              className="text-emerald-400"
            />
          )}
        </button>

        {requireFullscreen && (
          <button
            type="button"
            onClick={enableFullscreen}
            className="flex w-full items-center gap-4 rounded-xl border border-white/[0.08] px-4 py-4 text-left transition hover:bg-white/[0.04]"
          >
            <Maximize2
              size={20}
              className={
                fullscreenReady
                  ? "text-emerald-400"
                  : "text-white/40"
              }
            />

            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                Fullscreen
              </p>

              <p className="mt-1 text-xs text-white/35">
                {fullscreenReady
                  ? "Fullscreen ready"
                  : "Enter fullscreen mode"}
              </p>
            </div>

            {fullscreenReady && (
              <CheckCircle2
                size={18}
                className="text-emerald-400"
              />
            )}
          </button>
        )}
      </div>

      <button
        type="button"
        disabled={!ready}
        onClick={() =>
          onReady({
            camera_ready: cameraReady,
            microphone_ready: microphoneReady,
            fullscreen_ready: fullscreenReady,
          })
        }
        className="mt-6 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
      >
        {ready
          ? "Continue to Assessment"
          : "Complete the checks above"}
      </button>
    </div>
  );
}