"use client";

import { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react";
import { ProjectRecord } from "@/types/project";

type ProjectFiltersProps = {
  projects: ProjectRecord[];
  onFilterChange: (filteredProjects: ProjectRecord[]) => void;
};

export function ProjectFilters({ projects, onFilterChange }: ProjectFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  // Get unique values for filter options
  const categories = useMemo(() => {
    const cats = projects
      .map((p) => p.category)
      .filter((cat): cat is string => Boolean(cat && cat.trim()));
    return Array.from(new Set(cats)).sort();
  }, [projects]);

  const locations = useMemo(() => {
    const locs = projects
      .map((p) => p.location)
      .filter((loc): loc is string => Boolean(loc && loc.trim()));
    return Array.from(new Set(locs)).sort();
  }, [projects]);

  // Apply filters
  useEffect(() => {
    const filtered = projects.filter((project) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        project.name.toLowerCase().includes(searchLower) ||
        project.overview?.toLowerCase().includes(searchLower) ||
        project.description?.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" && project.status === "active") ||
        (selectedStatus === "completed" && project.status === "completed") ||
        (selectedStatus === "draft" && project.status === "draft");

      // Category filter
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      // Location filter
      const matchesLocation =
        selectedLocation === "all" || project.location === selectedLocation;

      return matchesSearch && matchesStatus && matchesCategory && matchesLocation;
    });

    onFilterChange(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, searchTerm, selectedStatus, selectedCategory, selectedLocation]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setSelectedCategory("all");
    setSelectedLocation("all");
  };

  const hasActiveFilters =
    searchTerm ||
    selectedStatus !== "all" ||
    selectedCategory !== "all" ||
    selectedLocation !== "all";

  return (
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Icon
          icon="solar:magnifer-linear"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-brand-gray"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search projects by name or description..."
          className="w-full rounded-lg border border-brand-gray-light/50 bg-white px-12 py-3.5 text-sm text-brand-dark placeholder:text-brand-gray focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-dark"
            aria-label="Clear search"
          >
            <Icon icon="solar:close-circle-linear" className="text-xl" />
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-brand-gray">
            Status:
          </span>
          <div className="flex gap-2">
            {["all", "active", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  selectedStatus === status
                    ? "bg-brand-primary text-white"
                    : "bg-brand-gray-light/30 text-brand-dark hover:bg-brand-gray-light/50"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-brand-gray">
              Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-full border border-brand-gray-light/50 bg-white px-4 py-1.5 text-xs font-medium text-brand-dark focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Location Filter */}
        {locations.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-brand-gray">
              Location:
            </span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="rounded-full border border-brand-gray-light/50 bg-white px-4 py-1.5 text-xs font-medium text-brand-dark focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            >
              <option value="all">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto flex items-center gap-2 rounded-full border border-brand-gray-light/50 bg-white px-4 py-1.5 text-xs font-medium text-brand-dark transition-all hover:bg-brand-gray-light/30"
          >
            <Icon icon="solar:close-circle-linear" className="text-base" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}

