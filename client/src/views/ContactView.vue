<script setup lang="ts">
import Brands from '@/components/Brands.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { AlarmClock, Clock, Heart, MapPin, Phone, Rocket, Smile } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'

const items = [
  { label: 'Home', link: '/' },
  { label: 'Contact', link: '/contact' },
]

const leaf = ref({
  zoom: 15,
})

onMounted(() => {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
  })
})
</script>

<template>
  <main class="contact">
    <Breadcrumb :items="items" />
    <section class="contact__heading">
      <h1 class="heading">Contact</h1>
      <p>Click on your neares store location below to set the road on Google Map.</p>
    </section>

    <section class="contact__map">
      <div style="height: 400px; width: 100%">
        <l-map
          ref="map"
          v-model:zoom="leaf.zoom"
          :center="[47.41322, -1.219482]"
          :options="{ scrollWheelZoom: false }"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
        </l-map>
      </div>
    </section>
    <section class="contact__benefit">
      <div>
        <MapPin :size="30" :strokeWidth="1" />
        <h3>OUR STORE</h3>
        <p>
          1000 Moon SQ. <br />
          Outside Earth, 1000
        </p>
      </div>
      <div>
        <Phone :size="30" :strokeWidth="1" />
        <h3>CONTACT INFO</h3>
        <p>
          Telephone: 299.792.4580 <br />
          E-mail: hello@example.com
        </p>
      </div>
      <div>
        <AlarmClock :size="30" :strokeWidth="1" />
        <h3>BUSNESS HOURS</h3>
        <p>
          Monday - Sunday: <br />
          09:00 - 20:00
        </p>
      </div>
    </section>
    <section class="contact__form">
      <h1 class="heading">Have an question? Contact us!</h1>
      <form action="">
        <div>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
        </div>
        <input type="text" placeholder="Subject" />
        <textarea placeholder="Write Your Comment..."></textarea>
        <button>Send Message</button>
      </form>
    </section>
    <Brands />
  </main>
</template>

<style>
.contact {
  display: flex;
  flex-direction: column;
}

.contact__heading p {
  text-align: center;
  margin-bottom: 2em;
  color: var(--secondary);
}

.contact__map {
  width: 100%;
}

.contact__benefit {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 2em;
}
.contact__benefit div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5em;
  align-items: center;
  text-align: center;
  flex-basis: 30%;
  color: var(--secondary);
}

.contact__benefit h3,
svg {
  color: var(--primary);
  font-weight: var(--font-medium);
}

.contact__form {
  max-width: 800px;
  width: 100%;
  margin-inline: auto;
}

.contact__form form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
}

.contact__form form div {
  display: flex;
  gap: 1em;
  flex-grow: 1;
}
.contact__form form div input {
  width: 100%;
}

.contact__form form input,
textarea {
  border: 2px solid var(--lighter);
  padding: 0.5em;
  color: var(--darker);
}

.contact__form button {
  display: center;
  align-items: center;
  justify-content: center;
  padding-block: 0.6em;
  background-color: var(--primary);
  color: var(--background);
}

@media screen and (max-width: 1024px) {
  .contact__benefit {
    display: flex;
    flex-direction: column;
    gap: 2em;
    justify-content: center;
  }
}
@media screen and (max-width: 768px) {
  .contact__form form div {
    flex-direction: column;
  }
}
</style>
