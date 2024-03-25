export async function getAllNotes() {
  const response = await fetch(`http://localhost:1337/api/notes`);
  const data = await response.json();

  const res = {};

  data.data.forEach(
    ({ id, attributes: { title, content, slug, updatedAt } }) => {
      res[slug] = JSON.stringify({
        title,
        content,
        updateTime: updatedAt,
      });
    }
  );

  return res;
}

export async function addNote(data) {
  const response = await fetch(`http://localhost:1337/api/notes`, {
    method: "POST",
    headers: {
      Authorization:
        "bearer 5c036fa2fdd2e7948965f6298d7fee6c061da444489aec3b611bc5f355dc10d960849a621e752551b4ddc9b3094736e172ac0ebd1b221f028b456f2774a0edd2c1cd67a1f2de3c5b8845eaa9be81678b08bbaddbf643f321285232843bfb6aa7899acd8c969f36fb82f4ef7893c551c481c08550fdd2545fa86eae847b13c8a2",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
  return res.data.attributes.slug;
}

export async function updateNote(uuid, data) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: "PUT",
    headers: {
      Authorization:
        "bearer 5c036fa2fdd2e7948965f6298d7fee6c061da444489aec3b611bc5f355dc10d960849a621e752551b4ddc9b3094736e172ac0ebd1b221f028b456f2774a0edd2c1cd67a1f2de3c5b8845eaa9be81678b08bbaddbf643f321285232843bfb6aa7899acd8c969f36fb82f4ef7893c551c481c08550fdd2545fa86eae847b13c8a2",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
}

export async function getNote(uuid) {
  const response = await fetch(
    `http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`
  );
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id,
  };
}

export async function delNote(uuid) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "bearer 5c036fa2fdd2e7948965f6298d7fee6c061da444489aec3b611bc5f355dc10d960849a621e752551b4ddc9b3094736e172ac0ebd1b221f028b456f2774a0edd2c1cd67a1f2de3c5b8845eaa9be81678b08bbaddbf643f321285232843bfb6aa7899acd8c969f36fb82f4ef7893c551c481c08550fdd2545fa86eae847b13c8a2",
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
}
