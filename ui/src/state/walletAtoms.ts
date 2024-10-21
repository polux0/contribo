// walletAtoms.ts
import { atom } from "jotai";

// Atoms for managing wallet connection and proof submission
export const walletStateAtom = atom({ isConnected: false, isConnecting: false });
export const proofUrlAtom = atom("");
export const isSubmittingAtom = atom(false);
export const isApprovedAtom = atom(false);
export const isClaimingAtom = atom(false);
export const cardStateAtom = atom<"connect" | "submit" | "approval" | "none">("connect");
export const isOverlayVisibleAtom = atom(false);