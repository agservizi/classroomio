<script lang="ts">
  const repoUrl = 'https://github.com/agservizi/classroomio';
  const branch = 'gestiio-training';
</script>

<svelte:head>
  <title>Source code — AGPL</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-6 py-16 text-slate-800">
  <h1 class="mb-4 text-2xl font-semibold">Codice sorgente (AGPL-3.0)</h1>
  <p class="mb-4 text-sm leading-relaxed text-slate-600">
    Questo servizio (ClassroomIO / Formazione Gestiio) è software libero sotto
    <strong>GNU Affero General Public License v3.0</strong>. Ai sensi dell’articolo 13
    AGPL, il codice corrispondente alla versione in esecuzione è disponibile
    pubblicamente.
  </p>
  <ul class="mb-6 list-disc space-y-2 pl-5 text-sm">
    <li>
      Repository:
      <a class="text-sky-600 underline" href={repoUrl} target="_blank" rel="noopener noreferrer"
        >{repoUrl}</a
      >
    </li>
    <li>Branch: <code class="rounded bg-slate-100 px-1">{branch}</code></li>
    <li>
      Documentazione modifiche Gestiio:
      <a
        class="text-sky-600 underline"
        href="{repoUrl}/blob/{branch}/AGPL-SOURCE.md"
        target="_blank"
        rel="noopener noreferrer">AGPL-SOURCE.md</a
      >
    </li>
  </ul>
  <p class="text-xs text-slate-500">
    Upstream: classroomio/classroomio. Fork e modifiche: Agenzia Plinio / Gestiio.
  </p>
</main>
