"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { SectionHeader } from "@/components/common/SectionHeader";
import {
  rmcPlants,
  rmcFeatures,
  rmcGrades,
  rmcDescription,
  deliveryLocations,
  rmcProducts,
} from "@/data/rmcPlants";
import Button from "@/components/common/Button";
import { useEnquiryModal } from "@/contexts/EnquiryModalContext";

export function AggregatesContent() {
  const { openModal } = useEnquiryModal();

  return (
    <>
      {/* Products Overview: Bitumen Mixes & RMC */}
      <section className="relative bg-gradient-to-br from-white via-brand-light/5 to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
          <SectionHeader
            eyebrow="OUR PRODUCTS"
            title="Bitumen Mixes & Ready-Mix Concrete"
            description="We are manufacturers and suppliers of aggregates, concrete and bitumen mixes, offering complete solutions in the infrastructure sector."
            align="center"
            eyebrowClassName="text-brand-primary"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-brand-gray-light/50 bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10">
                <Icon icon="solar:road-bold" className="text-2xl text-brand-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-brand-dark">Bitumen Mixes</h3>
              <p className="text-sm leading-relaxed text-brand-dark/70">
                Quality-assured bitumen mixes for road construction, resurfacing, and maintenance. Supplied to government and private projects across Maharashtra.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-gray-light/50 bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10">
                <Icon icon="solar:box-bold" className="text-2xl text-brand-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-brand-dark">Ready-Mix Concrete (RMC)</h3>
              <p className="text-sm leading-relaxed text-brand-dark/70">
                Quality-assured ready mix concrete from our plants. Precise mix designs, consistent strength, and on-time delivery for infrastructure and building projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is RMC Section */}
      <section className="relative bg-gradient-to-br from-white via-brand-light/5 to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
          <SectionHeader
            eyebrow="ABOUT RMC"
            title={rmcDescription.title}
            description=""
            align="center"
            eyebrowClassName="text-brand-primary"
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              {rmcDescription.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-brand-dark/80"
                >
                  {paragraph}
                </p>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {rmcDescription.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="mt-0.5 text-lg text-brand-primary"
                    />
                    <span className="text-sm text-brand-dark/70">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                  alt="RMC batching plant"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
                    alt="RMC transit mixer"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80"
                    alt="RMC quality control"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Plant in Tanooja Section */}
      <section className="relative bg-gradient-to-br from-brand-light/20 via-brand-primary/5 to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
          <SectionHeader
            eyebrow="OUR PLANT"
            title="Yashraj RMC Plant - Tanooja"
            description="Our state-of-the-art Ready Mix Concrete plant in Tanooja is equipped with advanced batching systems, quality control laboratories, and modern transit mixers to ensure consistent, high-quality concrete delivery."
            align="center"
            eyebrowClassName="text-brand-primary"
          />
          <div className="mt-12">
            {rmcPlants.map((plant) => (
              <div
                key={plant.id}
                className="grid gap-8 rounded-2xl border border-brand-gray-light/50 bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-8"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-brand-dark">
                      {plant.name}
                    </h3>
                    <p className="mt-1 text-sm text-brand-gray">
                      {plant.location}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon
                        icon="solar:map-point-bold"
                        className="mt-0.5 text-lg text-brand-primary"
                      />
                      <div>
                        <p className="text-sm font-medium text-brand-dark">
                          Address
                        </p>
                        <p className="text-sm text-brand-dark/70">
                          {plant.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon
                        icon="solar:chart-2-bold"
                        className="mt-0.5 shrink-0 text-lg text-brand-primary"
                      />
                      <div>
                        <p className="text-sm font-medium text-brand-dark">
                          Capacity
                        </p>
                        <p className="text-sm text-brand-dark/70">
                          {plant.capacity}
                        </p>
                      </div>
                    </div>
                    {plant.operationalHours && (
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="solar:clock-circle-bold"
                          className="mt-0.5 text-lg text-brand-primary"
                        />
                        <div>
                          <p className="text-sm font-medium text-brand-dark">
                            Operational Hours
                          </p>
                          <p className="text-sm text-brand-dark/70">
                            {plant.operationalHours}
                          </p>
                        </div>
                      </div>
                    )}
                    {plant.contact.manager && (
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="solar:user-bold"
                          className="mt-0.5 text-lg text-brand-primary"
                        />
                        <div>
                          <p className="text-sm font-medium text-brand-dark">
                            Plant Manager
                          </p>
                          <p className="text-sm text-brand-dark/70">
                            {plant.contact.manager}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {plant.specialties && plant.specialties.length > 0 && (
                    <div className="pt-2">
                      <p className="mb-2 text-sm font-medium text-brand-dark">
                        Specialties:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {plant.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="relative h-64 w-full overflow-hidden rounded-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                      alt={`${plant.name} facility`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="rounded-lg border border-brand-gray-light/50 bg-brand-light/20 p-4">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-dark">
                      Contact Information
                    </h4>
                    <div className="space-y-2">
                      {plant.contact.phone && (
                        <a
                          href={`tel:${plant.contact.phone}`}
                          className="flex items-center gap-2 text-sm text-brand-dark/70 transition hover:text-brand-primary"
                        >
                          <Icon icon="solar:phone-bold" className="text-base" />
                          {plant.contact.phone}
                        </a>
                      )}
                      {plant.contact.email && (
                        <a
                          href={`mailto:${plant.contact.email}`}
                          className="flex items-center gap-2 text-sm text-brand-dark/70 transition hover:text-brand-primary"
                        >
                          <Icon
                            icon="solar:letter-bold"
                            className="text-base"
                          />
                          {plant.contact.email}
                        </a>
                      )}
                    </div>
                  </div>
                  {plant.coordinates && (
                    <div className="space-y-2">
                      <div className="relative h-48 w-full overflow-hidden rounded-lg border border-brand-gray-light/50 bg-brand-light/20">
                        <iframe
                          src={`https://www.google.com/maps?q=${plant.coordinates.lat},${plant.coordinates.lng}&z=15&output=embed`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Map: ${plant.name}`}
                          className="absolute inset-0 h-full w-full"
                        />
                      </div>
                      <a
                        href={`https://www.google.com/maps?q=${plant.coordinates.lat},${plant.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-lg border border-brand-gray-light/50 bg-brand-light/20 py-2.5 text-sm font-medium text-brand-dark transition hover:bg-brand-light/30 hover:text-brand-primary"
                      >
                        <Icon
                          icon="solar:map-point-bold"
                          className="text-lg text-brand-primary"
                        />
                        View on Google Maps
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Locations Section */}
      <section className="relative bg-gradient-to-tr from-white via-brand-light/5 to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
          <SectionHeader
            eyebrow="SERVICE AREAS"
            title="Where We Deliver"
            description="Our RMC plant in Tanooja serves a wide range of locations across Maharashtra, ensuring timely delivery and optimal coverage for your construction projects."
            align="center"
            eyebrowClassName="text-brand-primary"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliveryLocations.map((location) => (
              <div
                key={location.id}
                className="group rounded-xl border border-brand-gray-light/50 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <Icon
                    icon="solar:map-point-bold"
                    className="text-2xl text-brand-primary"
                  />
                  <h3 className="text-lg font-semibold text-brand-dark">
                    {location.name}
                  </h3>
                </div>
                {location.description && (
                  <p className="mb-2 text-sm text-brand-dark/70">
                    {location.description}
                  </p>
                )}
                {location.radius && (
                  <p className="text-xs font-medium text-brand-primary">
                    {location.radius}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative bg-gradient-to-br from-brand-light/20 via-brand-primary/5 to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
          <SectionHeader
            eyebrow="OUR PRODUCTS"
            title="RMC Product Range"
            description="We offer a comprehensive range of Ready Mix Concrete products, each designed to meet specific construction requirements and performance standards."
            align="center"
            eyebrowClassName="text-brand-primary"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rmcProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-xl border border-brand-gray-light/50 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-brand-dark">
                    {product.name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-brand-dark/70">
                    {product.description}
                  </p>
                  {product.features && product.features.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray">
                        Key Features:
                      </p>
                      <ul className="space-y-1">
                        {product.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-brand-dark/70"
                          >
                            <Icon
                              icon="solar:check-circle-bold"
                              className="mt-0.5 text-brand-primary"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {product.applications && product.applications.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray">
                        Applications:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.applications.map((app, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-xs font-medium text-brand-primary"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-gradient-to-br from-brand-light/20 via-brand-primary/5 to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
          <SectionHeader
            eyebrow="WHY CHOOSE US"
            title="Our RMC Advantages"
            description="Comprehensive Ready Mix Concrete solutions backed by quality, reliability, and expertise."
            align="center"
            eyebrowClassName="text-brand-primary"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rmcFeatures.map((feature, index) => (
              <div
                key={index}
                className="group rounded-xl border border-brand-gray-light/50 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                  <Icon icon={feature.icon} className="text-2xl" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-brand-dark">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-dark/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concrete Grades Section */}
      <section className="relative bg-gradient-to-br from-brand-light/20 via-brand-primary/5 to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
          <SectionHeader
            eyebrow="CONCRETE GRADES"
            title="Available Concrete Mixes"
            description="We offer a wide range of concrete grades to suit various construction requirements, from standard applications to high-strength structural needs."
            align="center"
            eyebrowClassName="text-brand-primary"
          />
          <div className="mt-12 overflow-x-auto">
            <div className="min-w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-brand-primary bg-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-brand-dark">
                      Grade
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-brand-dark">
                      Compressive Strength
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-brand-dark">
                      Common Use
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gray-light/30">
                  {rmcGrades.map((grade, index) => (
                    <tr
                      key={index}
                      className="bg-white transition hover:bg-brand-light/30"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-brand-primary">
                          {grade.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-brand-dark/70">
                        {grade.strength}
                      </td>
                      <td className="px-6 py-4 text-sm text-brand-dark/70">
                        {grade.use}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
