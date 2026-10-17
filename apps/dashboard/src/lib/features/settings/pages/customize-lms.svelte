<script lang="ts">
  import { Switch } from '@cio/ui/base/switch';

  import { currentOrg, isFreePlan } from '$lib/utils/store/org';
  import { t } from '$lib/utils/functions/translations';
  import { orgApi } from '$features/org/api/org.svelte';
  import { handleOpenWidget } from '$features/ui/course-landing-page/store';
  import { Button } from '@cio/ui/base/button';
  import { Input } from '@cio/ui/base/input';
  import type { TLocale } from '@cio/db/types';

  import { UploadWidget, UnsavedChanges } from '$features/ui';
  import * as Field from '@cio/ui/base/field';

  interface Props {
    hasUnsavedChanges?: boolean;
  }

  let { hasUnsavedChanges = $bindable(false) }: Props = $props();

  let widgetKey = $state('');
  let customization = $state($state.snapshot($currentOrg.customization));
  let savedCustomizationSnapshot = $state('');
  let capturedOrgId = $state('');
  // Gestiio fork: Italian enforced, no language selector in UI
  let languageLocale = $state<TLocale>('it');
  let languageEnforced = $state(true);

  function widgetControl(key: string) {
    widgetKey = key;
    $handleOpenWidget.open = true;
  }

  function authBackgroundWidgetControl() {
    if ($isFreePlan) {
      return;
    }

    widgetKey = 'auth-background';
    $handleOpenWidget.open = true;
  }

  function deleteAuthBackgroundImage() {
    customization.auth.backgroundImage = '';
  }

  function captureCustomizationSnapshot() {
    savedCustomizationSnapshot = JSON.stringify({
      customization,
      language: { locale: languageLocale, enforced: languageEnforced }
    });
  }

  $effect(() => {
    const organizationId = $currentOrg?.id;
    if (!organizationId || organizationId === capturedOrgId) return;

    capturedOrgId = organizationId;
    customization = $state.snapshot($currentOrg.customization);
    languageLocale = 'it';
    languageEnforced = true;
    savedCustomizationSnapshot = '';
    captureCustomizationSnapshot();
  });

  $effect(() => {
    if (!$currentOrg?.id || !savedCustomizationSnapshot) return;

    hasUnsavedChanges =
      JSON.stringify({
        customization,
        language: { locale: languageLocale, enforced: languageEnforced }
      }) !== savedCustomizationSnapshot;
  });

  export async function handleSave() {
    await orgApi.update($currentOrg.id, {
      customization,
      settings: {
        language: { locale: languageLocale, enforced: languageEnforced }
      }
    });

    if (orgApi.success) {
      captureCustomizationSnapshot();
      hasUnsavedChanges = false;
    }
  }

  export function handleDiscard() {
    if (!savedCustomizationSnapshot) return;

    const savedSettings = JSON.parse(savedCustomizationSnapshot);
    customization = savedSettings.customization;
    languageLocale = savedSettings.language.locale;
    languageEnforced = savedSettings.language.enforced;
    hasUnsavedChanges = false;
  }
</script>

<UnsavedChanges bind:hasUnsavedChanges />

<Field.Group class="w-full max-w-md! px-2">
  <Field.Set>
    <Field.Legend>{$t('components.settings.customize_lms.dashboard.title')}</Field.Legend>
    <Field.Group>
      <Field.Field orientation="horizontal">
        <Field.Label>{$t('components.settings.customize_lms.dashboard.community')}</Field.Label>
        <Switch bind:checked={customization.dashboard.community} />
        <Field.Description class="text-sm">
          {customization.dashboard.community
            ? $t('components.settings.customize_lms.enabled')
            : $t('components.settings.customize_lms.disabled')}
        </Field.Description>
      </Field.Field>

      <Field.Field orientation="horizontal">
        <Field.Label>{$t('components.settings.customize_lms.dashboard.exercises')}</Field.Label>
        <Switch bind:checked={customization.dashboard.exercise} />
        <Field.Description class="text-sm">
          {customization.dashboard.exercise
            ? $t('components.settings.customize_lms.enabled')
            : $t('components.settings.customize_lms.disabled')}
        </Field.Description>
      </Field.Field>

      <Field.Field>
        <Field.Label>{$t('components.settings.customize_lms.dashboard.banner_image')}</Field.Label>
        <Button variant="outline" onclick={() => widgetControl('banner-image')}>
          {$t('components.settings.customize_lms.dashboard.banner_image_btn')}
        </Button>
        {#if customization.dashboard.bannerImage}
          <img alt="Banner" src={customization.dashboard.bannerImage} class="mt-2 w-full rounded-md" />
        {/if}
        {#if $handleOpenWidget.open && widgetKey === 'banner-image'}
          <UploadWidget bind:imageURL={customization.dashboard.bannerImage} />
        {/if}
      </Field.Field>

      <Field.Field>
        <Field.Label>{$t('components.settings.customize_lms.dashboard.banner_text')}</Field.Label>
        <Input
          placeholder={$t('components.settings.customize_lms.dashboard.banner_text_placeholder')}
          bind:value={customization.dashboard.bannerText}
        />
      </Field.Field>
    </Field.Group>
  </Field.Set>

  <Field.Separator />

  <Field.Set>
    <Field.Legend>{$t('components.settings.customize_lms.auth_background.title')}</Field.Legend>
    <Field.Description>{$t('components.settings.customize_lms.auth_background.description')}</Field.Description>
    {#if $isFreePlan}
      <Field.Description class="ui:text-muted-foreground">
        {$t('components.settings.customize_lms.auth_background.paid_plan_note')}
      </Field.Description>
    {/if}
    <Field.Group>
      <Field.Field>
        <div class="flex items-center gap-2">
          <Button onclick={authBackgroundWidgetControl} disabled={$isFreePlan}>
            {$t('course.navItem.settings.replace')}
          </Button>
          <Button variant="outline" onclick={deleteAuthBackgroundImage} disabled={$isFreePlan}>
            {$t('ai.reset')}
          </Button>
        </div>
        {#if $handleOpenWidget.open && widgetKey === 'auth-background'}
          <UploadWidget bind:imageURL={customization.auth.backgroundImage} />
        {/if}
      </Field.Field>
      <Field.Field>
        <div class="relative w-fit">
          <img
            style="min-width:280px; min-height:200px"
            alt={$t('components.settings.customize_lms.auth_background.preview_alt')}
            src={customization.auth.backgroundImage
              ? customization.auth.backgroundImage
              : '/images/classroomio-course-img-template.jpg'}
            class="relative mt-2 h-[200px] w-[280px] rounded-md object-cover md:mt-0"
          />
        </div>
      </Field.Field>
    </Field.Group>
  </Field.Set>

  <Field.Separator />

  <Field.Set>
    <Field.Legend>{$t('components.settings.customize_lms.course.title')}</Field.Legend>
    <Field.Group>
      <Field.Field orientation="horizontal">
        <Field.Label>{$t('components.settings.customize_lms.course.newsfeed')}</Field.Label>
        <Switch bind:checked={customization.course.newsfeed} />
        <Field.Description class="text-gray-600">
          {customization.course.newsfeed
            ? $t('components.settings.customize_lms.enabled')
            : $t('components.settings.customize_lms.disabled')}
        </Field.Description>
      </Field.Field>

      <Field.Field orientation="horizontal">
        <Field.Label>{$t('components.settings.customize_lms.course.grading')}</Field.Label>
        <Switch bind:checked={customization.course.grading} />
        <Field.Description class="text-gray-600">
          {customization.course.grading
            ? $t('components.settings.customize_lms.enabled')
            : $t('components.settings.customize_lms.disabled')}
        </Field.Description>
      </Field.Field>
    </Field.Group>
  </Field.Set>

  <Field.Separator />

  <Field.Set>
    <Field.Legend>{$t('components.settings.customize_lms.apps.title')}</Field.Legend>
    <Field.Group>
      <Field.Field orientation="horizontal">
        <Field.Label>{$t('components.settings.customize_lms.apps.poll')}</Field.Label>
        <Switch bind:checked={customization.apps.poll} />
        <Field.Description class="text-gray-600">
          {customization.apps.poll
            ? $t('components.settings.customize_lms.enabled')
            : $t('components.settings.customize_lms.disabled')}
        </Field.Description>
      </Field.Field>
      <Field.Field orientation="horizontal">
        <Field.Label>{$t('components.settings.customize_lms.apps.live_comment')}</Field.Label>
        <Switch bind:checked={customization.apps.comments} />
        <Field.Description class="text-gray-600">
          {customization.apps.comments
            ? $t('components.settings.customize_lms.enabled')
            : $t('components.settings.customize_lms.disabled')}
        </Field.Description>
      </Field.Field>
    </Field.Group>
  </Field.Set>
</Field.Group>
