-- Permite a los administradores leer los desbloqueos de ejercicios de todos los alumnos.
-- Lo necesita el panel "Cajas abiertas" de /admin/stats (components/admin/stats/KpiDetails.tsx).
-- Sin esta regla, cada usuario solo ve sus propios desbloqueos.
CREATE POLICY "Admins pueden ver todos los desbloqueos" ON public.user_unlocks
FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
));
