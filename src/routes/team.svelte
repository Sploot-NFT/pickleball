<script>
    import Header from '../Header.svelte';
    import CardBrowser from '../CardBrowser.svelte';
    import TeamSelect from '../TeamSelect.svelte';
</script>
<Header/>
<table>
    <tr>
        <td>
            <CardBrowser />
        </td>
        <td>
            <div style="margin-left: 2vw">
                <TeamSelect />
            </div>
        </td>
    </tr>
</table>