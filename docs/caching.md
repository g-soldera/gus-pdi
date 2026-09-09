# Caching Strategy Guidelines

## Overview
This document outlines the caching strategy for the Gus PDI application.

## Strategies
1. **Static Data**: Cache at CDN or build time.
2. **Dynamic Data**: Use Next.js fetch caching and revalidation.
3. **Client-side State**: Use React state or lightweight stores when necessary.
