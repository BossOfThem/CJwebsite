/**
 * Placeholder lead store — appends submitted quote requests to a JSON file
 * so the admin dashboard has something real to show.
 *
 * Swap for a DB (Postgres / Supabase / etc.) when leads volume justifies it.
 */

import fs from "node:fs/promises";
import path from "node:path";
import type { QuoteInput } from "./schema";

export type LeadStatus = "new" | "contacted" | "scheduled" | "won" | "lost";

export type Lead = QuoteInput & {
  id: string;
  createdAt: string;
  status: LeadStatus;
  notes?: string;
  assignedTo?: string | null;
  source?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]");
  }
}

async function readAll(): Promise<Lead[]> {
  await ensureFile();
  const raw = await fs.readFile(LEADS_FILE, "utf8");
  try {
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

async function writeAll(leads: Lead[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function appendLead(input: QuoteInput, source = "web"): Promise<Lead> {
  const all = await readAll();
  const lead: Lead = {
    ...input,
    id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: "new",
    assignedTo: null,
    source,
  };
  all.unshift(lead);
  await writeAll(all);
  return lead;
}

export async function listLeads(): Promise<Lead[]> {
  return readAll();
}

export async function updateLead(id: string, patch: Partial<Lead>): Promise<Lead | null> {
  const all = await readAll();
  const idx = all.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  const merged = { ...all[idx], ...patch, id: all[idx].id } as Lead;
  all[idx] = merged;
  await writeAll(all);
  return merged;
}

export async function leadCounts(): Promise<Record<LeadStatus, number>> {
  const all = await readAll();
  const counts: Record<LeadStatus, number> = {
    new: 0, contacted: 0, scheduled: 0, won: 0, lost: 0,
  };
  for (const l of all) counts[l.status]++;
  return counts;
}
