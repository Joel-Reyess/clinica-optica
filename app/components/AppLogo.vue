<template>
  <span class="brand-lockup">
    <svg
      class="brand-eye"
      viewBox="0 0 92 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 17C24 2 61 1 83 15"
        stroke="#C99638"
        stroke-width="3.2"
        stroke-linecap="round"
      />
      <path
        d="M4 27C17 11 31 7 45 7C60 7 75 15 88 27C75 40 60 46 45 46C30 46 16 40 4 27Z"
        fill="white"
        stroke="#102B4A"
        stroke-width="3.2"
        stroke-linejoin="round"
      />
      <circle
        cx="46"
        cy="27"
        r="14"
        stroke="#102B4A"
        stroke-width="4"
      />
      <circle
        cx="46"
        cy="27"
        r="5.5"
        fill="#102B4A"
      />
      <circle
        cx="50"
        cy="23"
        r="1.8"
        fill="white"
      />
    </svg>
    <span class="brand-type">
      <strong>CLÍNICA ÓPTICA</strong>
      <small>EXPERTOS EN SALUD VISUAL</small>
    </span>
  </span>
</template>

<style scoped>
.brand-lockup {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  color: #102b4a;
  white-space: nowrap;
}

.brand-eye {
  width: 72px;
  height: auto;
  flex: 0 0 auto;
}

.brand-type {
  display: grid;
  gap: 2px;
}

.brand-type strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(0.83rem, 1.35vw, 1.06rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1;
}

.brand-type small {
  font-size: 0.43rem;
  font-weight: 700;
  letter-spacing: 0.105em;
  line-height: 1.2;
}

@media (max-width: 440px) {
  .brand-eye {
    width: 62px;
  }

  .brand-type strong {
    font-size: 0.82rem;
  }

  .brand-type small {
    font-size: 0.39rem;
  }
}
</style>
